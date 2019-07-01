/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-state */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Animated from "react-native-reanimated";
import { TabView, SceneMap } from "react-native-tab-view";
import { StyledText } from "@components/text";
import { View, FlexView } from "@components/views";
import { colors } from "@utils/constants";
import { getVisits } from "@services/opear-api";
import { tabViewStyles, TabItem } from "./styles";
import UpcomingVisitsScreen from "./upcoming-visits";
import PastVisitsScreen from "./past-visits";
import { getAge } from "../../utils/helpers";

const FirstRoute = () => <UpcomingVisitsScreen />;
const SecondRoute = () => <PastVisitsScreen />;

@inject("store")
@observer
class ManageVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "upcoming", title: "UPCOMING" },
        { key: "past", title: "PAST" }
      ]
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", route => {
      console.tron.log("Provider visits screen will focus: ", route);
      getVisits({ successHandler: this.handleFetchedVisits });
      getVisits({ past: true, successHandler: this.handleFetchedVisits });
    });
  }

  handleFetchedVisits = res => {
    const {
      store: { visitsStore }
    } = this.props;
    const { data } = res;

    if (!data || typeof data !== "object") {
      console.tron.log("Invalid data: ", data);
      return false;
    }

    for (const key in data) {
      const visitArray = data[key];
      // console.tron.log("Provider visit array: ", visitArray);
      visitArray.forEach(visit => {
        let {
          parent_id,
          child_id,
          address_id,
          care_provider_id,
          reason,
          symptoms,
          appointment_time,
          parent_notes,
          visit_notes,
          payment_amount,
          state,
          child,
          address,
          parent
        } = visit;

        child = child || {};
        address = address || {};
        parent = parent || {};

        const newVisit = {
          id: visit.id,
          parentId: parent_id,
          childId: child_id,
          addressId: address_id,
          careProviderId: care_provider_id,
          reason,
          symptoms: symptoms || [],
          appointmentTime: new Date(appointment_time),
          parentNotes: parent_notes || "",
          visitNotes: visit_notes || "",
          paymentAmount: payment_amount || 0,
          state: state || "",
          child: {
            id: child.id || -1,
            age: getAge(new Date(child.dob || "01/01/1900")),
            gender: child.gender || "",
            name: child.name || "",
            firstName: child.first_name || "",
            lastName: child.last_name || "",
            birthDate: new Date(child.dob || "01/01/1900"),
            birthHistory: child.birth_history || "",
            surgicalHistory: child.surgical_history || "",
            currentMedications: child.current_medications || "",
            hospitalizations: child.hospitalizations || "",
            currentMedicalConditions: child.current_medical_conditions || "",
            allergies: (child.allergies || "").split(", ")
          },
          address: {
            id: address.id || -1,
            name: address.name || "",
            street: address.street || "",
            city: address.city || "",
            state: address.state || "",
            zip: address.zip || 0,
            apartmentNumber: "",
            latitude: "",
            longitude: ""
          },
          parent: {
            id: parent.id || -1,
            name: parent.name || "",
            email: parent.email || "",
            phone: parent.phone || "",
            zip: parent.zip || "",
            acceptedPrivacy: parent.accepted_privacy || false,
            acceptedTermsOfService: parent.accepted_terms_of_service || false,
            active: parent.active || false
          }
        };
        visitsStore.addVisit(newVisit);
      });
    }
    return true;
  };

  renderTabBar = props => {
    const { index } = this.state;
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={tabViewStyles.tabBar}>
        <View style={{ paddingTop: 24, paddingBottom: 16, paddingLeft: 16 }}>
          <StyledText fontSize={28} fontFamily="FlamaMedium" lineHeight={36}>
            {index === 0 ? "Upcoming Visits" : "Past Visits"}
          </StyledText>
        </View>
        <FlexView>
          {props.navigationState.routes.map((route, i) => {
            const color = Animated.color(
              35,
              140,
              Animated.round(
                Animated.interpolate(props.position, {
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 229 : 0
                  )
                })
              )
            );
            const active = index === i;

            return (
              <TabItem
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                active={active}
                onPress={() => this.setState({ index: i })}
              >
                <Animated.Text
                  style={{
                    color: active ? color : colors.MIDGREY,
                    fontSize: 14,
                    fontFamily: active ? "FlamaMedium" : "Flama"
                  }}
                >
                  {route.title}
                </Animated.Text>
              </TabItem>
            );
          })}
        </FlexView>
      </View>
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          upcoming: FirstRoute,
          past: SecondRoute
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({ index })}
        // initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

export default ManageVisitsScreen;
