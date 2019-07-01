/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import { inject, observer, PropTypes as MobXPropTypes } from "mobx-react";
import { withNavigation } from "react-navigation";
import { StyledText } from "@components/text";
import { ContainerView, View, ContentWrapper } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { VisitDetailCard } from "@components/cards";
import { colors } from "@utils/constants";

const imgFox = require("../../../assets/images/Fox.png");

@inject("store")
@observer
class PastVisitsScreen extends React.Component {
  static propTypes = {
    store: MobXPropTypes.observableObject.isRequired
  };

  render() {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;

    const visits = visitsStore.visits
      .filter(v => v.state === "completed")
      .sort(
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

export default withNavigation(PastVisitsScreen);
