/* eslint-disable import/no-unresolved */
import React from "react";
import { Alert, Linking } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { updateVisit } from "@services/opear-api";
import {
  LargeBookedDetailCard,
  VisitDetailCard
} from "../../../components/cards";
import { ServiceButton } from "../../../components/service-button";
import { ContainerView, View, ViewCentered } from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";
import { StyledText } from "../../../components/text";
import { IllnessContainer, TextBox } from "./styles";
import {
  getIndexByValue,
  getValueById,
  formatAMPM
} from "../../../utils/helpers";

const imgDog = require("../../../../assets/images/Dog.png");

@inject("store")
@observer
class VisitInProgressScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const { navigation } = props;
    const visitID = navigation.getParam("visitID", false);

    this.state = {
      visitID
    };
  }

  completeVisit = () => {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;

    const { visitID } = this.state;
    const { visits } = visitsStore;

    const data = {
      state: "completed"
    };

    const successHandler = () => {
      const index = getIndexByValue(visits, visitID);
      visitsStore.setVisitState(index, "canceled");
      navigate("VisitsDefault");
    };

    const errorHandler = () => {
      Alert.alert("Visit Update Error", "Failed to complete the visit.");
    };

    updateVisit(visitID, data, { successHandler, errorHandler });
  };

  render() {
    const {
      store: { visitsStore }
    } = this.props;
    // const { arrived } = providerStore;
    const { visits } = visitsStore;
    const { visitID } = this.state;

    const visit = getValueById(visits, visitID);
    const {
      child,
      parent,
      address,
      reason,
      parentNotes,
      visitNotes,
      appointmentTime
    } = visit;

    const strAllergies = (child.allergies || []).join(", ");
    const strSymptoms = (child.symptoms || []).join(", ");
    const childName = child.firstName
      ? `${child.firstName} ${child.lastName}`
      : "";
    const strTime = formatAMPM(appointmentTime);
    const strAddress = `${address.city}${
      address.state ? `, ${address.state}` : ""
    }`;

    return (
      <ContainerView>
        {/* <HeaderWrapper>
          <NavHeader
            title="Visit Details"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper> */}
        <ViewCentered paddingTop={44} paddingBottom={20}>
          <StyledText
            fontSize={24}
            fontFamily="FlamaMedium"
            color={colors.BLACK}
          >
            Visit In Progress
          </StyledText>
        </ViewCentered>
        <ScrollView padding={0}>
          <IllnessContainer>
            <StyledText fontSize={16} color={colors.WHITE}>
              {`Allergies: ${strAllergies}`}
            </StyledText>
          </IllnessContainer>
          <View style={{ padding: 16, marginTop: 16 }}>
            <VisitDetailCard
              avatarImg={child.avatarImg || imgDog}
              name={childName}
              illness={strSymptoms}
              time={strTime}
              address={strAddress}
            />
            <View style={{ marginTop: 32 }}>
              <LargeBookedDetailCard
                type="Parent Name"
                text={parent && parent.name}
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
              <LargeBookedDetailCard type="Visit Reason" text={reason} />
              <LargeBookedDetailCard type="Allergies" text={strAllergies} />
              <LargeBookedDetailCard type="Parent Notes" text={parentNotes} />
            </View>
          </View>
          <View style={{ marginTop: 20, padding: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <StyledText
                fontSize={14}
                fontFamily="FlamaMedium"
                color={colors.BLACK60}
              >
                Visit Notes
              </StyledText>
            </View>
            <TextBox editable multiline value={visitNotes} />
          </View>
          <View style={{ marginTop: 48, paddingLeft: 16, paddingRight: 16 }}>
            <View style={{ paddingTop: 6, paddingBottom: 6 }}>
              <ServiceButton
                title="Complete Visit"
                onPress={this.completeVisit}
              />
            </View>
            <View style={{ paddingTop: 6, paddingBottom: 6 }}>
              <ServiceButton
                grey
                title="Contact Support"
                onPress={() => Linking.openURL("mailto:help@opear.com")}
              />
            </View>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default VisitInProgressScreen;
