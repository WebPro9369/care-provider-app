/* eslint-disable react/sort-comp */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React from "react";
import { inject, observer, PropTypes as MobXPropTypes } from "mobx-react";
import { Platform, Linking, Alert } from "react-native";
import MapView from "react-native-maps";
import haversine from "haversine";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TwilioVoice from "react-native-twilio-programmable-voice";
import { NavHeader } from "@components/nav-header";
import { LargeBookedDetailCard, VisitDetailCard } from "@components/cards";
import { ServiceButton } from "@components/service-button";
import { ContainerView, HeaderWrapper, View } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { colors } from "@utils/constants";
import { updateVisit } from "@services/opear-api";
import {
  getValueById,
  getIndexByValue,
  formatAMPM,
  isToday,
  addressToString
} from "@utils/helpers";
import { GoogleMapsService } from "@services";

const imgDog = require("../../../../assets/images/Dog.png");

const threshold = 1000;

@inject("store")
@observer
class VisitDetailsScreen extends React.Component {
  static propTypes = {
    store: MobXPropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const visitID = navigation.getParam("visitID", false);
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
        distance: 0
      }
    };
    this.getVisitGeo();
  }

  getVisitGeo = () => {
    const {
      store: { visitsStore }
    } = this.props;
    const { visitID, map } = this.state;
    const visit = getValueById(visitsStore.visits, visitID);
    const { address } = visit;

    GoogleMapsService.getGeo(addressToString(address), innerRes => {
      const { data } = innerRes;
      if (data && data.results && data.results[0].geometry) {
        const { lat, lng } = data.results[0].geometry.location;
        this.setState({
          map: {
            ...map,
            latitude: lat,
            longitude: lng
          },
          loaded: true
        });
      }
    });
  };

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

  startVisit = () => {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;
    const { visitID } = this.state;
    const { visits } = visitsStore;

    const data = {
      state: "in_progress"
    };

    const successHandler = () => {
      const index = getIndexByValue(visits, visitID);
      visitsStore.setVisitState(index, "in_progress");
      navigate("VisitsVisitInProgress", { visitID });
    };

    const errorHandler = () => {
      Alert.alert("Visit Update Error", "Failed to start the appointment.");
    };

    updateVisit(visitID, data, { successHandler, errorHandler });
  };

  cancelVisit = () => {
    const {
      navigation: { goBack },
      store: { visitsStore }
    } = this.props;

    const { visitID } = this.state;
    const { visits } = visitsStore;

    const data = {
      state: "canceled"
    };

    const successHandler = () => {
      const index = getIndexByValue(visits, visitID);
      visitsStore.setVisitState(index, "canceled");
      goBack();
    };

    const errorHandler = () => {
      Alert.alert("Visit Update Error", "Failed to cancel the visit.");
    };

    updateVisit(visitID, data, { successHandler, errorHandler });
  };

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

  callParent = phone => {
    TwilioVoice.connect({ To: phone });
    console.tron.log("Place call to parent at: ", phone);
  };

  render() {
    const {
      navigation: { goBack, navigate },
      store: { providerStore, visitsStore }
    } = this.props;
    const { arrived } = providerStore;
    const { visitID, loaded, map } = this.state;

    const visit = getValueById(visitsStore.visits, visitID);
    if (!visit) {
      return (
        <ContainerView>
          <HeaderWrapper>
            <NavHeader title="Loading..." size="medium" />
          </HeaderWrapper>
        </ContainerView>
      );
    }
    const past = visit.state === "completed";

    const {
      child,
      address,
      parent,
      symptoms,
      appointment_time,
      reason,
      parent_notes,
      visit_notes
    } = visit;

    const childName = child.first_name
      ? `${child.first_name} ${child.last_name}`
      : "N/A";

    const appointmentTime = new Date(appointment_time);
    const time = formatAMPM(appointmentTime);

    if (!loaded) {
      return (
        <ContainerView>
          <HeaderWrapper>
            <NavHeader title="Loading..." size="medium" />
          </HeaderWrapper>
        </ContainerView>
      );
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
          {map && (
            <MapView
              style={{ alignSelf: "stretch", height: 200 }}
              region={map}
              initialRegion={map}
            />
          )}
          <View style={{ padding: 16, marginTop: 16 }}>
            <VisitDetailCard
              avatarImg={imgDog}
              name={childName}
              illness={symptoms.join(", ")}
              time={time}
              address={address}
              disabled
            />
            <View style={{ marginTop: 32 }}>
              {!past ? (
                <LargeBookedDetailCard
                  type="Parent Name"
                  text={parent.name || "N/A"}
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
                  onPress={() => {
                    this.callParent(parent.phone);
                  }}
                />
              ) : null}
              <LargeBookedDetailCard
                type="Visit Reason"
                text={reason}
                disabled
              />
              <LargeBookedDetailCard
                type="Allergies"
                text={child.allergies}
                disabled
              />
              <LargeBookedDetailCard
                type="Parent Notes"
                text={parent_notes}
                disabled
              />
              {past ? (
                <LargeBookedDetailCard
                  type="Visit Notes"
                  text={visit_notes}
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
                    onPress={() =>
                      navigate("VisitsVisitInProgress", { visitID })
                    }
                  />
                ) : (
                  <ServiceButton
                    title="Navigate"
                    onPress={this.navigateHandler}
                  />
                )}
              </View>
              {isToday(appointmentTime) ? (
                <View style={{ paddingTop: 6, paddingBottom: 6 }}>
                  <ServiceButton
                    title="Start Appointment"
                    onPress={() => this.startVisit()}
                  />
                </View>
              ) : null}
              <View style={{ paddingTop: 6, paddingBottom: 6 }}>
                <ServiceButton
                  grey
                  title="Cancel Visit"
                  onPress={() => this.cancelVisit()}
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
