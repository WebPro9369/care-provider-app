/* eslint-disable camelcase */
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
import { colors } from "../../../utils/constants";
import { StyledText } from "../../../components/text";
import { IllnessContainer, TextBox } from "./styles";
import {
  getIndexByValue,
  getValueById,
  formatAMPM
} from "../../../utils/helpers";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";

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
      visitID,
      visitNotesEdited: null
    };
  }

  onChangeVisitNotes = text => {
    this.setState({
      visitNotesEdited: text
    });
  };

  completeVisit = () => {
    const {
      navigation: { navigate },
      store: { visitsStore }
    } = this.props;

    const { visitID, visitNotesEdited } = this.state;
    const { visits } = visitsStore;

    const data = {
      state: "completed"
    };

    if (visitNotesEdited) {
      data.visit_notes = visitNotesEdited;
    }

    const successHandler = () => {
      const index = getIndexByValue(visits, visitID);
      visitsStore.setVisitState(index, "canceled");
      if (visitNotesEdited) {
        visitsStore.setVisitNotes(index, visitNotesEdited);
      }
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
    const { visitID, visitNotesEdited } = this.state;

    const visit = getValueById(visits, visitID);
    const {
      child,
      parent,
      address,
      reason,
      parent_notes,
      visit_notes,
      appointment_time,
      symptoms
    } = visit;

    const strAllergies = child.allergies || "N/A";
    const childName = child.first_name
      ? `${child.first_name} ${child.last_name}`
      : "";
    const strTime = formatAMPM(new Date(appointment_time));
    const strVisitNotes = visitNotesEdited || visit_notes;
    const formattedDate = new Date(appointment_time).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

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
        <KeyboardScrollView padding={0}>
          {strAllergies.length ? (
            <IllnessContainer>
              <StyledText fontSize={16} color={colors.WHITE}>
                {`Allergies: ${strAllergies}`}
              </StyledText>
            </IllnessContainer>
          ) : null}
          <View style={{ padding: 16, marginTop: 16 }}>
            <VisitDetailCard
              avatarImg={child.avatarImg || imgDog}
              name={childName}
              illness={symptoms.join(", ")}
              time={strTime}
              date={formattedDate}
              address={address}
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
              <LargeBookedDetailCard type="Parent Notes" text={parent_notes} />
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
            <TextBox
              editable
              multiline
              value={strVisitNotes}
              onChangeText={this.onChangeVisitNotes}
            />
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
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default VisitInProgressScreen;
