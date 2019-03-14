import React from "react";
import { Avatar, ButtonGroup } from "react-native-elements";
import { FormTextInput, StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  FormInputWrapper,
  HeaderWrapper,
  FormWrapper,
  ViewCentered
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";

class ApplicationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseNumber: "1234567",
      boardCertification: null,
      malpracticeInsurance: null,
      educationHistory: null,
      workHistory: null,
      specialties: null,
      offeredServices: null,
      legalHistory: null,
      references: null,
      whereHeard: null,
      supervisingPhysician: null,
      selectedIndexes: []
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndexes) {
    this.setState({ selectedIndexes });
  }

  render() {
    const {
      navigation: { goBack, navigate }
    } = this.props;
    const buttons = ["MD", "NP", "PA", "APRN"];
    const {
      licenseNumber,
      boardCertification,
      malpracticeInsurance,
      educationHistory,
      workHistory,
      specialties,
      offeredServices,
      legalHistory,
      references,
      whereHeard,
      supervisingPhysician,
      selectedIndexes
    } = this.state;
    return (
      <ContainerView behavior="padding" enabled>
        <HeaderWrapper>
          <NavHeader
            title="Your application"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <ScrollView>
          <ViewCentered paddingBottom={24}>
            <Avatar
              size="xlarge"
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              editButton={{
                name: "pluscircle",
                type: "antdesign",
                color: colors.BLUE,
                size: 30,
                containerStyle: {
                  backgroundColor: colors.WHITE,
                  borderRadius: 15
                }
              }}
              showEditButton
            />
          </ViewCentered>
          <FormWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="License Number"
                value={licenseNumber}
                placeholder="License Number"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Board Certification"
                value={boardCertification}
                placeholder="Board Certification"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <StyledText fontSize={14} color={colors.TEXT_GREY}>
                Title (select all that apply)
              </StyledText>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndexes={selectedIndexes}
                buttons={buttons}
                containerStyle={{ height: 40 }}
                selectMultiple
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Malpractice Insurance"
                value={malpracticeInsurance}
                placeholder="Malpractice Insurance"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Education History"
                value={educationHistory}
                placeholder="Education History"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Work History"
                value={workHistory}
                placeholder="Work History"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Specialties"
                value={specialties}
                placeholder="Specialties"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Offered Services"
                value={offeredServices}
                placeholder="Offered Services"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Legal History"
                value={legalHistory}
                placeholder="Legal History"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="References"
                value={references}
                placeholder="References"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Where did you hear about us?"
                value={whereHeard}
                placeholder="Where did you hear about us?"
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                label="Supervising Physician"
                value={supervisingPhysician}
                placeholder="Supervising Physician (optional)"
              />
            </FormInputWrapper>
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <ServiceButton
              title="Submit Application"
              onPress={() => navigate("Dashboard")}
            />
          </FormInputWrapper>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default ApplicationScreen;
