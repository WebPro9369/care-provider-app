import React from "react";
import PropTypes from "prop-types";
import { inject, observer, PropTypes as MobXPropTypes } from "mobx-react";
import { Platform, Linking } from "react-native";
import MapView from "react-native-maps";
import haversine from "haversine";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TwilioVoice from "react-native-twilio-programmable-voice";
import { NavHeader } from "@components/nav-header";
import {
  LargeBookedDetailCard,
  VisitDetailCard
} from "@components/cards";
import { ServiceButton } from "@components/service-button";
import { ContainerView, HeaderWrapper, View } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { colors } from "@utils/constants";
import { getVisit } from "@services/opear-api";
import { formatAMPM } from "@utils/helpers";

const imgDog = require("../../../../assets/images/Dog.png");

const threshold = 1000;

@inject("store")
@observer
class VisitDetailsScreen extends React.Component {
  static propTypes = {
    past: PropTypes.bool,
    store: MobXPropTypes.observableObject.isRequired
  };

  static defaultProps = {
    past: false
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const visitID = navigation.getParam('visitID', false);
    // TODO: if (!visitID) error!

    this.state = {
      visitID,
      map: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
  
        currentLatitude: 37.78925,
        currentLongitude: -122.4924,
        distance: 0,
      },
      loaded: false,
      data: {},
    };
  }

  componentDidMount() {
    const { store: { currentUserStore: { id: userID } } } = this.props;
    const { visitID } = this.state;

    this.navigatorWatch();

    const successHandler = (res) => {
      const {
        reason,
        symptoms: illness,
        parent_notes: parentNotes,
        visit_notes: visitNotes,
        appointment_time: appointmentTime,
        child: {
          id: childID,
          first_name: childFirstName,
          last_name: childLastName,
          allergies,
        },
        address: {
          city, 
          state, 
        }
      } = res.data;

      const data = { 
        child: {
          key: childID,
          avatarImg: imgDog,
          name: `${childFirstName} ${childLastName}`,
          illness,
          time: formatAMPM(new Date(appointmentTime)),
          address: `${city}, ${state}`,
          color: "#f9b44d",
        },
        parentName: "Michael Smith", // TODO: missing
        reason,
        allergies: allergies.join(', '),
        parentNotes: parentNotes, 
      };

      this.setState({ data, loaded: true });
    };

    getVisit(
      userID,
      visitID,
      { successHandler });
  }

  navigatorWatch() {
    const {
      store: { providerStore }
    } = this.props;
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { map } = this.state;
        const { latitude, longitude } = position.coords;
        const visitCoordinate = {
          latitude: map.latitude,
          longitude: map.longitude
        };
        const newCoordinate = {
          latitude,
          longitude
        };
        const distance =
          haversine(visitCoordinate, newCoordinate, { unit: "meter" }) || 0;
        providerStore.setArrived(distance < threshold);

        this.setState({
          map: {
            ...map,
            currentLatitude: latitude,
            currentLongitude: longitude,
            distance
          }
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  navigateHandler = () => {
    const { map } = this.state;
    const from = `${map.currentLatitude},${map.currentLongitude}`;
    const to = `${map.latitude},${map.longitude}`;
    const url = Platform.select({
      ios: `maps:0, 0?saddr=${from}&daddr=${to}`,
      android: `https://www.google.com/maps/dir/?api=1&origin=${from}&destination=${to}`
    });
    Linking.openURL(url);
  };

  render() {
    const {
      past,
      navigation: { goBack, navigate },
      store: { providerStore }
    } = this.props;
    const { arrived } = providerStore;
    const {
      loaded,
      map,
      data: {
        child,
        parentName,
        reason,
        allergies,
        parentNotes,
        visitNotes,
      }
    } = this.state;

    if (!loaded) {
      return (<ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Loading..."
            size="medium"
          />
        </HeaderWrapper>
      </ContainerView>);
    }

    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Visit Details"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <ScrollView padding={0}>
          <MapView
            style={{ alignSelf: "stretch", height: 200 }}
            initialRegion={map}
          />
          <View style={{ padding: 16, marginTop: 16 }}>
            <VisitDetailCard
              avatarImg={child.avatarImg}
              name={child.name}
              illness={child.illness}
              time={child.time}
              address={child.address}
              disabled
            />
            <View style={{ marginTop: 32 }}>
              <LargeBookedDetailCard
                type="Parent Name"
                text={parentName}
                icon={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <FontAwesome
                    name="phone"
                    size={36}
                    style={{
                      backgroundColor: "transparent",
                      color: colors.DARKSKYBLUE
                    }}
                  />
                }
                disabled
                onPress={() => {
                  console.tron.log("Clicking phone");
                  TwilioVoice.connect({ To: "+19085008863" });
                }}
              />
              <LargeBookedDetailCard
                type="Visit Reason"
                text={reason}
                disabled
              />
              <LargeBookedDetailCard
                type="Allergies"
                text={allergies}
                disabled
              />
              <LargeBookedDetailCard
                type="Parent Notes"
                text={parentNotes}
                disabled
              />
              {past ? (
                <LargeBookedDetailCard
                  type="Visit Notes"
                  text={visitNotes}
                  disabled
                />
              ) : null}
            </View>
          </View>
          {!past ? (
            <View style={{ marginTop: 48, paddingLeft: 16, paddingRight: 16 }}>
              <View style={{ paddingTop: 6, paddingBottom: 6 }}>
                {arrived ? (
                  <ServiceButton
                    title="Arrived"
                    onPress={() => navigate("VisitsVisitInProgress")}
                  />
                ) : (
                  <ServiceButton
                    title="Navigate"
                    onPress={this.navigateHandler}
                  />
                )}
              </View>
              <View style={{ paddingTop: 6, paddingBottom: 6 }}>
                <ServiceButton
                  grey
                  title="Cancel Visit"
                  onPress={() => goBack()}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </ContainerView>
    );
  }
}

export default VisitDetailsScreen;
