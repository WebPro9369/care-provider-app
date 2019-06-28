/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
import React from "react";
import { withNavigation } from "react-navigation";
import { inject, observer, PropTypes } from "mobx-react";
import { StyledText } from "@components/text";
import { ContainerView, View, ContentWrapper } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { VisitDetailCard } from "@components/cards";
import { colors } from "@utils/constants";
// import { formatAMPM } from "@utils/helpers";
import { getVisits } from "@services/opear-api";
import { getAge } from "../../utils/helpers";

const imgFox = require("../../../assets/images/Fox.png");

@inject("store")
@observer
class UpcomingVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      visits: []
    };
  }

  componentDidMount() {
    const {
      store: {
        currentUserStore: { id },
        visitsStore
      }
    } = this.props;

    getVisits(id, {
      successHandler: res => {
        for (const key in res.data) {
          const visitArray = res.data[key];
          console.tron.log("gettig visits: ", key, visitArray);
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
              symptoms,
              appointmentTime: new Date(appointment_time),
              parentNotes: parent_notes,
              visitNotes: visit_notes,
              paymentAmount: payment_amount,
              state,
              child: {
                id: child.id || -1,
                age: getAge(new Date(child.dob || "01/01/1900")),
                gender: child.gender || "",
                firstName: child.first_name || "",
                lastName: child.last_name || "",
                birthDate: new Date(child.dob || "01/01/1900"),
                birthHistory: child.birth_history || "",
                surgicalHistory: child.surgical_history || "",
                currentMedications: child.current_medications || "",
                hospitalizations: child.hospitalizations || "",
                currentMedicalConditions:
                  child.current_medical_conditions || "",
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
      }
    });
  }

  render() {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;

    const visits = visitsStore.visits.sort(
      (a, b) => new Date(b.appointmentTime) - new Date(a.appointmentTime)
    );

    const visitsDisplayStack = [];
    const addedTimes = [];
    const dayOptions = { month: "long", day: "numeric" };
    const timeOptions = { day: undefined, hour: "numeric" };

    visits.map(visit => {
      const { appointmentTime } = visit;
      const dateAsObject = new Date(appointmentTime);

      if (!addedTimes.includes(appointmentTime)) {
        addedTimes.push(appointmentTime);
        visitsDisplayStack.push(
          <StyledText fontSize={16} color={colors.BLACK60}>
            {dateAsObject.toLocaleString("en-US", dayOptions)}
          </StyledText>
        );
      }

      const formattedTime = new Date(visit.appointmentTime)
        .toLocaleDateString("en-US", timeOptions)
        .split(", ");

      const childName = visit.child.firstName
        ? `${visit.child.firstName} ${visit.child.lastName}`
        : "N/A";

      return visitsDisplayStack.push(
        <View style={{ marginBottom: 9 }}>
          <VisitDetailCard
            avatarImg={imgFox}
            name={childName}
            illness={visit.reason}
            time={formattedTime[1]}
            address={visit.address.street || "N/A"}
            onPress={() =>
              navigate("VisitsVisitDetails", {
                visitID: visit.id
              })
            }
          />
        </View>
      );
    });

    // for (const date of dates) {
    //   const visitsOnDate = visits[date];

    //   for (const visitOnDate of visitsOnDate) {
    //   }
    // }

    return (
      <ContainerView style={{ marginTop: 0 }}>
        <ScrollView padding={0}>
          <View style={{ paddingTop: 24 }}>
            <ContentWrapper>{visitsDisplayStack}</ContentWrapper>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default withNavigation(UpcomingVisitsScreen);
