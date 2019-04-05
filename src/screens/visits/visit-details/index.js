import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import MapView from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavHeader } from "../../../components/nav-header";
import {
  LargeBookedDetailCard,
  VisitDetailCard
} from "../../../components/cards";
import { ServiceButton } from "../../../components/service-button";
import { ContainerView, HeaderWrapper, View } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";

const imgDog = require("../../../../assets/images/Dog.png");

@inject("store")
@observer
class VisitDetailsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  state = {
    child: {
      key: "1",
      avatarImg: imgDog,
      name: "Benjamin",
      illness: "Flu Shot",
      time: "6PM",
      address: "Bushwick, NY",
      color: "#f9b44d"
    },
    parentName: "Michael Smith",
    visitReason: "Precautionary",
    allergies: "Crustaceans, gluten",
    parentNotes: "Benjamin wears contact lenses",
    map: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  componentDidMount() {
    const {
      store: { providerStore }
    } = this.props;
    setTimeout(() => providerStore.setArrived(true), 5000);
  }

  render() {
    const {
      navigation: { goBack, navigate },
      store: { providerStore }
    } = this.props;
    const { arrived } = providerStore;
    const {
      child,
      parentName,
      visitReason,
      allergies,
      parentNotes,
      map
    } = this.state;
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
              />
              <LargeBookedDetailCard type="Visit Reason" text={visitReason} />
              <LargeBookedDetailCard type="Allergies" text={allergies} />
              <LargeBookedDetailCard type="Parent Notes" text={parentNotes} />
            </View>
          </View>
          <View style={{ marginTop: 48, paddingLeft: 16, paddingRight: 16 }}>
            <View style={{ paddingTop: 6, paddingBottom: 6 }}>
              {arrived ? (
                <ServiceButton
                  title="Arrived"
                  onPress={() => navigate("VisitsVisitInProgress")}
                />
              ) : (
                <ServiceButton title="Navigate" />
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
        </ScrollView>
      </ContainerView>
    );
  }
}

export default VisitDetailsScreen;
