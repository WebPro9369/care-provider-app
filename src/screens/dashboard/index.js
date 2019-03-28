import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";

import { StyledText } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import {
  ContainerView,
  View,
  HeaderWrapper,
  FlexView
} from "../../components/views";
import { ScrollView } from "../../components/views/scroll-view";
import { VisitDetailCard } from "../../components/cards";
import { ContentWrapper, MatchingMessageWrapper } from "./styles";
import RequestVisitModalComponent from "../modals/request-visit";
import ReviewAllergiesModalComponent from "../modals/review-allergies";
import { colors } from "../../utils/constants";

const imgRightArrow = require("../../../assets/images/Right_arrow.png");
const imgDog = require("../../../assets/images/Dog.png");
const imgFox = require("../../../assets/images/Fox.png");
const imgTiger = require("../../../assets/images/Tiger.png");

@inject("store")
@observer
class DashboardScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      // selectedIllness: null,
      user: {
        name: "John"
      },
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
      ],
      reviewAllergyModalVisible: false
    };
  }

  componentDidMount() {
    const { store } = this.props;
    // setTimeout(() => store.providerStore.setAppointment(true), 3000);
  }

  showReviewAllergyModal = () => {
    const { store } = this.props;
    store.providerStore.setAppointment(false);
    this.setState({ reviewAllergyModalVisible: true });
  };

  hideReviewAllergyModal = () => {
    this.setState({ reviewAllergyModalVisible: false });
  };

  render() {
    const {
      navigation: { navigate },
      store
    } = this.props;
    const { providerStore } = store;
    const { completeApplication, appointment } = providerStore;

    // if (appointment) {
    //   setTimeout(() => {
    //     ProviderState.setOutstandingAppointment(true);
    //   }, 3000);
    // }
    const { user, bookingList, reviewAllergyModalVisible } = this.state;

    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader title="" size="small" hasBackButton={false} />
        </HeaderWrapper>
        <ScrollView padding={0}>
          <ContentWrapper>
            <StyledText fontSize={28} fontFamily="FlamaMedium">
              {"Hi, "}
              {user.name}
              {"!"}
            </StyledText>
          </ContentWrapper>
          {!completeApplication ? (
            <TouchableOpacity onPress={() => navigate("Application")}>
              <MatchingMessageWrapper>
                <FlexView style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <StyledText
                    fontSize={16}
                    lineHeight={24}
                    style={{ maxWidth: 270 }}
                  >
                    You must complete your application before seeing patients!
                  </StyledText>
                  <Image source={imgRightArrow} width={25} />
                </FlexView>
              </MatchingMessageWrapper>
            </TouchableOpacity>
          ) : null}
          {false ? (
            <TouchableOpacity onPress={() => navigate("BookingReceipt")}>
              <MatchingMessageWrapper>
                <FlexView style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <StyledText fontSize={16} lineHeight={24}>
                    Placeholder text
                  </StyledText>
                  <Image source={imgRightArrow} width={25} />
                </FlexView>
              </MatchingMessageWrapper>
            </TouchableOpacity>
          ) : null}
          <View
            style={{
              marginTop: !completeApplication ? 16 : 48,
              marginBottom: 40
            }}
          >
            <ContentWrapper>
              <StyledText>Upcoming bookings</StyledText>
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
              <StyledText>What to expect</StyledText>
              <StyledText
                fontSize={16}
                lineHeight={30}
                style={{
                  paddingTop: 12,
                  paddingBottom: 12,
                  color: colors.BLACK60
                }}
              >
                1.&nbsp;&nbsp;&nbsp;&nbsp;Book a child visit
              </StyledText>
              <StyledText
                fontSize={16}
                lineHeight={30}
                style={{
                  paddingTop: 12,
                  paddingBottom: 12,
                  color: colors.BLACK60
                }}
              >
                2.&nbsp;&nbsp;&nbsp;&nbsp;Have visit
              </StyledText>
              <StyledText
                fontSize={16}
                lineHeight={30}
                style={{
                  paddingTop: 12,
                  paddingBottom: 12,
                  color: colors.BLACK60
                }}
              >
                3.&nbsp;&nbsp;&nbsp;&nbsp;Compete post-visit review
              </StyledText>
            </ContentWrapper>
          </View>
        </ScrollView>
        <RequestVisitModalComponent
          modalVisible={appointment}
          onAccept={this.showReviewAllergyModal}
        />
        <ReviewAllergiesModalComponent
          modalVisible={reviewAllergyModalVisible}
          onAccept={() => {
            this.hideReviewAllergyModal();
            navigate("History");
          }}
        />
      </ContainerView>
    );
  }
}
export default DashboardScreen;
