import React from "react";
import { inject, observer } from "mobx-react";

import { StyledText } from "../../components/text";
import { ContainerView, View, ContentWrapper } from "../../components/views";
import { ScrollView } from "../../components/views/scroll-view";
import { VisitDetailCard } from "../../components/cards";

const imgDog = require("../../../assets/images/Dog.png");
const imgFox = require("../../../assets/images/Fox.png");
const imgTiger = require("../../../assets/images/Tiger.png");

@inject("ProviderState")
@observer
class HistoryScreen extends React.Component {
  // static propTypes = {
  //   ProviderState: PropTypes.observableObject.isRequired
  // };

  constructor(props) {
    super(props);

    this.state = {
      bookingList: [
        {
          key: "1",
          avatarImg: imgDog,
          name: "Benjamin",
          illness: "Flu Shot",
          time: "6PM",
          address: "Bushwick, NY",
          color: "#f9b44d"
        },
        {
          key: "2",
          avatarImg: imgFox,
          name: "Audrey",
          illness: "Coxsackie Virus",
          time: "6PM",
          address: "Bushwick, NY",
          color: "#f9b44d"
        },
        {
          key: "3",
          avatarImg: imgTiger,
          name: "Tommy",
          illness: "Vital Signs",
          time: "6PM",
          address: "Bushwick, NY",
          color: "#f9b44d"
        }
      ]
    };
  }

  render() {
    // const {
    //   // navigation: { navigate },
    //   ProviderState
    // } = this.props;
    // const { providerData } = ProviderState;

    // if (appointment) {
    //   setTimeout(() => {
    //     ProviderState.setOutstandingAppointment(true);
    //   }, 3000);
    // }
    const { bookingList } = this.state;

    return (
      <ContainerView style={{ marginTop: 44 }}>
        <ScrollView padding={0}>
          <ContentWrapper style={{ marginBottom: 48 }}>
            <StyledText fontSize={28} fontFamily="Flama-Medium">
              Upcoming Visits
            </StyledText>
          </ContentWrapper>
          <View>
            <ContentWrapper>
              <StyledText>Today</StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {bookingList.map(item => (
                  <View key={item.key} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                    />
                  </View>
                ))}
              </View>
            </ContentWrapper>
          </View>
          <View>
            <ContentWrapper>
              <StyledText>Jan 9</StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {bookingList.map(item => (
                  <View key={item.key} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                    />
                  </View>
                ))}
              </View>
            </ContentWrapper>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}
export default HistoryScreen;
