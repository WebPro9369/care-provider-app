/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";

import { StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import {
  ContainerView,
  View,
  HeaderWrapper,
  FlexView
} from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { VisitDetailCard } from "@components/cards";
import { colors } from "@utils/constants";
import { getVisits } from "@services/opear-api";
import { formatAMPM } from "@utils/helpers";
import { DeeplinkHandler } from "@components/deeplink-handler";
import ReviewAllergiesModalComponent from "../modals/review-allergies";
import RequestVisitModalComponent from "../modals/request-visit";
import { ContentWrapper, MatchingMessageWrapper } from "./styles";

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
      visits: [],
      visitForApproval: null,
      allergiesForReview: null
    };
  }

  componentDidMount() {
    this.getUserVisits();
    this.timer = setInterval(
      () => this.getUserVisits(),
      30000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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

    const visitArr = Object.values(data).reduce((acc, current) => {
      (current || []).forEach(item => acc.push(item));
      return acc;
    }, []);

    visitArr.forEach(visit => visitsStore.addVisit(visit));
    return true;
  };

  getUserVisits = () => {
    getVisits({
      successHandler: res => {
        if (!res.data) return;
        let visitForApproval;

        const {
          store: { visitsStore }
        } = this.props;

        const visits = Object.values(res.data).flat();

        visitsStore.setVisits(visits);

        const viewVisits = visits
          .sort(
            (a, b) =>
              new Date(a.appointment_time) - new Date(b.appointment_time)
          )
          .map(visitData => {
            const {
              id,
              state: visitState,
              reason: illness,
              appointment_time: appointmentTime,
              address,
              symptoms,
              parent_notes: parentNotes,
              child: {
                first_name: childFirstName,
                last_name: childLastName,
                allergies
              }
            } = visitData;

            const visit = {
              id,
              avatarImg: [imgDog, imgTiger, imgFox][
                Math.floor(Math.random() * 3)
              ], // TODO: add actual avatar
              name: `${childFirstName} ${childLastName}`,
              illness,
              symptoms,
              time: formatAMPM(new Date(appointmentTime)),
              appointmentTime,
              address,
              allergies,
              parentNotes,
              date: new Date(appointmentTime).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })
            };

            if (visitState === "approving") {
              visitForApproval = visit;
            }

            if (visitState !== "scheduled" && visitState !== "in_progress")
              return false;

            return visit;
          })
          .filter(Boolean);

        this.setState({ visits: viewVisits, visitForApproval });
      }
    });
  };

  onRequestVisitAccept = () => {
    const { visits, visitForApproval } = this.state;

    visits.push(visitForApproval);
    this.showReviewAllergyModal(visitForApproval.allergies);

    this.setState({ visits, visitForApproval: null });
  };

  onRequestVisitCancel = () => {
    this.setState({ visitForApproval: null });
  };

  showReviewAllergyModal = allergies => {
    this.setState({ allergiesForReview: allergies });
  };

  hideReviewAllergyModal = () => {
    this.setState({ allergiesForReview: false });
  };

  render() {
    const { navigation, store } = this.props;

    const { navigate } = navigation;

    const {
      applicationStore: { CareProviderSubscriptionsActive },
      providerStore: { completeApplication },
      currentUserStore: { firstName, payout_account }
    } = store;

    const { allergiesForReview, visits, visitForApproval } = this.state;

    return (
      <ContainerView>
        <DeeplinkHandler navigation={navigation} />
        <HeaderWrapper>
          <NavHeader title="" size="small" hasBackButton={false} />
        </HeaderWrapper>
        <ScrollView padding={0}>
          <ContentWrapper>
            <StyledText fontSize={28} fontFamily="FlamaMedium">
              {"Hi, "}
              {firstName}
              {"!"}
            </StyledText>
          </ContentWrapper>
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
          {CareProviderSubscriptionsActive &&
            (!payout_account || !payout_account.length) && (
              <MatchingMessageWrapper>
                <StyledText fontSize={16}>
                  You need to set up your annual subscription payment method
                  before you can accept appointments.
                </StyledText>
              </MatchingMessageWrapper>
            )}
          <View
            style={{
              marginTop: !completeApplication ? 16 : 48,
              marginBottom: 40
            }}
          >
            <ContentWrapper>
              <StyledText>Upcoming bookings</StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {visits.slice(0, 3).map(item => (
                  <View key={item.id} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                      date={item.date}
                      onPress={() =>
                        navigate("DashboardVisitDetails", { visitID: item.id })
                      }
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
          visit={visitForApproval}
          userInfo={store.currentUserStore}
          modalVisible={!!visitForApproval}
          onAccept={this.onRequestVisitAccept}
          onCancel={this.onRequestVisitCancel}
        />
        <ReviewAllergiesModalComponent
          allergies={allergiesForReview}
          modalVisible={!!allergiesForReview}
          onAccept={this.hideReviewAllergyModal}
        />
      </ContainerView>
    );
  }
}
export default DashboardScreen;
