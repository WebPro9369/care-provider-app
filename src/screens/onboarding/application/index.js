import React from "react";
import { Alert } from "react-native";
import { Avatar, ButtonGroup } from "react-native-elements";
import { inject, observer, PropTypes } from "mobx-react";
import axios from "axios";
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
// import { ScrollView } from "../../../components/views/scroll-view";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { registerCareProvider } from "../../../services/opear-api";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class ApplicationScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirth: null,
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

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: {
        providerStore: { onboardingData }
      }
    } = this.props;
    const { dateOfBirth } = this.state;
    // onboardingData.setDOB("01/01/1970");
    console.tron.log("Onboarding data: ", onboardingData.toJSON());
    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(dateOfBirth) && !dateRegex2.test(dateOfBirth)) {
      return Alert.alert("Please enter DoB in mm/dd/yyyy format");
    }

    // registerCareProvider(
    //   onboardingData.toJSON(),
    //   () => navigate("TabDashboard"),
    //   () => Alert.alert("Registration failed.")
    // );
    return navigate("TabDashboard");
    // axios
    //   .post(
    //     "http://localhost:3000/api/v2/care_provider/registrations",
    //     onboardingData.toJSON()
    //   )
    //   .then(res => {
    //     console.tron.log("Registration response: ", res);
    //     navigate("TabDashboard");
    //   })
    //   .catch(err => {
    //     console.tron.log("Registration error: ", err);
    //     Alert.alert("Registration failed.");
    //   });

    // navigate("TabDashboard");
  };

  updateIndex(selectedIndexes) {
    this.setState({ selectedIndexes });
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const buttons = ["MD", "NP", "PA", "APRN"];
    const {
      dateOfBirth,
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
        <KeyboardScrollView>
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
                label="Date of Birth"
                value={dateOfBirth}
                placeholder="mm/dd/yyyy"
              />
            </FormInputWrapper>
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
              <StyledText fontSize={14} color={colors.BLACK60}>
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
            {selectedIndexes.includes(0) ? null : (
              <FormInputWrapper>
                <FormTextInput
                  label="Supervising Physician"
                  value={supervisingPhysician}
                  placeholder="Supervising Physician"
                />
              </FormInputWrapper>
            )}
          </FormWrapper>
          <FormInputWrapper style={{ marginBottom: 20 }}>
            <ServiceButton title="Submit Application" onPress={this.onSubmit} />
          </FormInputWrapper>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default ApplicationScreen;
