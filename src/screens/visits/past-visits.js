import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { withNavigation } from "react-navigation";
import { StyledText } from "@components/text";
import { ContainerView, View, ContentWrapper } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { VisitDetailCard } from "@components/cards";
import { colors } from "@utils/constants";
import { formatAMPM  } from "@utils/helpers";
import { getVisits } from "@services/opear-api";

const imgFox = require("../../../assets/images/Fox.png");
const imgDog = require("../../../assets/images/Dog.png");
const imgTiger = require("../../../assets/images/Tiger.png");

@inject("store")
@observer
class PastVisitsScreen extends React.Component {
  constructor(props ){
    super(props);

    this.state = {
      visits: []
    };
  }

  componentDidMount() {
    const { store: { currentUserStore: { id }}} = this.props;

    getVisits(id, {
      past: true,
      successHandler: (res) => {
        const visits = res.data;

        this.setState({ visits: visits })
      }
    });
  }

  render() {
    const { visits } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    const dates = Object.keys(visits)

    var visitsDisplayStack = [];
    var dayOptions = { month: 'long', day: 'numeric' };
    var timeOptions = { day: undefined, hour: 'numeric' };

    for (const date of dates) {

      var visitsOnDate = visits[date];

      dateAsObject = new Date(date);

      visitsDisplayStack.push(
        <StyledText fontSize={16} color={colors.BLACK60}>
          {dateAsObject.toLocaleString("en-US", dayOptions)}
        </StyledText>
      );

      for (const visitOnDate of visitsOnDate) {

        var formattedTime = new Date(visitOnDate.appointment_time).toLocaleDateString("en-US", timeOptions);
        formattedTime = formattedTime.split(", ");

        visitsDisplayStack.push(
          <View style={{ marginBottom: 9 }}>
            <VisitDetailCard
              avatarImg={imgFox}
              name={visitOnDate.child.first_name}
              illness={visitOnDate.reason}
              time={formattedTime[1]}
              address={visitOnDate.address.street}
              onPress={() => navigate("VisitsVisitDetails", {
                visitID: visitOnDate.id
              })}
            />
          </View>
        );
      }

    }

    return (
      <ContainerView style={{ marginTop: 0 }}>
        <ScrollView padding={0}>
          <View style={{ paddingTop: 24 }}>
            <ContentWrapper>
            {visitsDisplayStack}
            </ContentWrapper>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default withNavigation(PastVisitsScreen);
