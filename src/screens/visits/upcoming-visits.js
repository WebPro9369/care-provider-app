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
        const visits = res.data;

        for (const key in res.data) {
          const visitArray = res.data[key];
          visitArray.forEach(visit =>
            visitsStore.addVisit({
              id: visit.id,
              parentId: visit.parent_id,
              childId: visit.child_id,
              addressId: visit.address_id,
              careProviderId: visit.care_provider_id,
              reason: visit.reason,
              symptoms: visit.symptoms,
              appointmentTime: new Date(visit.appointment_time),
              parentNotes: visit.parent_notes,
              visitNotes: visit.visit_notes,
              paymentAmount: visit.payment_amount,
              state: visit.state
            })
          );
        }

        this.setState({ visits });
      }
    });
  }

  render() {
    const { visits } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    const dates = Object.keys(visits);

    const visitsDisplayStack = [];
    const dayOptions = { month: "long", day: "numeric" };
    const timeOptions = { day: undefined, hour: "numeric" };

    for (const date of dates) {
      const visitsOnDate = visits[date];

      const dateAsObject = new Date(date);

      visitsDisplayStack.push(
        <StyledText fontSize={16} color={colors.BLACK60}>
          {dateAsObject.toLocaleString("en-US", dayOptions)}
        </StyledText>
      );

      for (const visitOnDate of visitsOnDate) {
        let formattedTime = new Date(
          visitOnDate.appointment_time
        ).toLocaleDateString("en-US", timeOptions);
        formattedTime = formattedTime.split(", ");

        visitsDisplayStack.push(
          <View style={{ marginBottom: 9 }}>
            <VisitDetailCard
              avatarImg={imgFox}
              name={visitOnDate.child.first_name}
              illness={visitOnDate.reason}
              time={formattedTime[1]}
              address={visitOnDate.address.street}
              onPress={() =>
                navigate("VisitsVisitDetails", {
                  visitID: visitOnDate.id
                })
              }
            />
          </View>
        );
      }
    }

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
