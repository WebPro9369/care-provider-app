import React from "react";
// import axios from "axios";
import { Alert } from "react-native";
import { Avatar, ButtonGroup } from "react-native-elements";
import { inject, observer, PropTypes } from "mobx-react";
import ImagePicker from "react-native-image-picker";
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
// import { registerCareProvider } from "../../../services/opear-api";
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
      avatarSource: null,
      dateOfBirth: null,
      licenseNumber: "1234567",
      ssn: null,
      maskedSsn: null,
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
    this.onAddAvatar = this.onAddAvatar.bind(this);
    this.onInpuTextChange = this.onInpuTextChange.bind(this);
    this.onSumbit = this.onSubmit.bind(this);
  }

  onAddAvatar = () => {
    const options = {
      title: "Select Profile Picture"
    };

    ImagePicker.showImagePicker(options, response => {
      console.tron.log("Response = ", response);

      if (response.didCancel) {
        console.tron.log("User cancelled image picker");
      } else if (response.error) {
        console.tron.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.tron.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  onInpuTextChange = name => text => {
    if (name === "ssn") {
      const ssnPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
      if (ssnPattern.test(text)) {
        return this.setState({
          ssn: text,
          maskedSsn: `XXX-XX-${text.substr(7, 4)}`
        });
      }
    }
    return this.setState({
      [name]: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: {
        providerStore: { onboardingData }
      }
    } = this.props;
    const { dateOfBirth, ssn } = this.state;
    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    console.tron.log("Onboarding data: ", onboardingData);
    if (!dateRegex1.test(dateOfBirth) && !dateRegex2.test(dateOfBirth)) {
      return Alert.alert("Please enter DoB in mm/dd/yyyy format");
    }

    const ssnPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
    if (!ssnPattern.test(ssn)) {
      return Alert.alert(
        "Please enter Social Security Number in 'XXX-XX-XXXX' format"
      );
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
      avatarSource,
      dateOfBirth,
      licenseNumber,
      ssn,
      maskedSsn,
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

    const avatarOptions = avatarSource
      ? {
          source: { uri: avatarSource.uri }
        }
      : {
          icon: { name: "user", type: "font-awesome" }
        };
    return (
      <ContainerView>
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
              {...avatarOptions}
              size="xlarge"
              rounded
              editButton={{
                name: "pluscircle",
                type: "antdesign",
                color: colors.BLUE,
                size: 30,
                containerStyle: {
                  backgroundColor: colors.WHITE,
                  borderRadius: 15
                },
                onPress: this.onAddAvatar
              }}
              showEditButton
            />
          </ViewCentered>
          <FormWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="dateOfBirth"
                label="Date of Birth"
                value={dateOfBirth}
                placeholder="mm/dd/yyyy"
                onChangeText={this.onInpuTextChange("dateOfBirth")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseNumber"
                label="License Number"
                value={licenseNumber}
                placeholder="License Number"
                returnKeyType="next"
                onSubmitEditing={() =>
                  console.tron.log("Second input: ", this.secondTextInput)
                }
                blurOnSubmit={false}
                onChangeText={this.onInpuTextChange("licenseNumber")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="ssn"
                label="Social Security Number"
                value={maskedSsn || ssn}
                placeholder="123-45-6789"
                returnKeyType="next"
                onSubmitEditing={() =>
                  console.tron.log("Second input: ", this.secondTextInput)
                }
                blurOnSubmit={false}
                onChangeText={this.onInpuTextChange("ssn")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="boardCertification"
                label="Board Certification"
                value={boardCertification}
                placeholder="Board Certification"
                ref={input => {
                  this.secondTextInput = input;
                }}
                onChangeText={this.onInpuTextChange("boardCertification")}
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
                name="malpracticeInsurance"
                label="Malpractice Insurance"
                value={malpracticeInsurance}
                placeholder="Malpractice Insurance"
                onChangeText={this.onInpuTextChange("malpracticeInsurance")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="educationHistory"
                label="Education History"
                value={educationHistory}
                placeholder="Education History"
                onChangeText={this.onInpuTextChange("educationHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="workHistory"
                label="Work History"
                value={workHistory}
                placeholder="Work History"
                onChangeText={this.onInpuTextChange("workHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="specialties"
                label="Specialties"
                value={specialties}
                placeholder="Specialty 1, specialty 2, etc."
                onChangeText={this.onInpuTextChange("specialties")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="offeredServices"
                label="Offered Services"
                value={offeredServices}
                placeholder="Service 1, service 2, etc."
                onChangeText={this.onInpuTextChange("offeredServices")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="legalHistory"
                label="Legal History"
                value={legalHistory}
                placeholder="Legal History"
                onChangeText={this.onInpuTextChange("legalHistory")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="references"
                label="References"
                value={references}
                placeholder="References"
                onChangeText={this.onInpuTextChange("references")}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="whereHeard"
                label="Where did you hear about us?"
                value={whereHeard}
                placeholder="Where did you hear about us?"
                onChangeText={this.onInpuTextChange("whereHeard")}
              />
            </FormInputWrapper>
            {selectedIndexes.includes(0) ? null : (
              <FormInputWrapper>
                <FormTextInput
                  name="supervisingPhysician"
                  label="Supervising Physician"
                  value={supervisingPhysician}
                  placeholder="Supervising Physician"
                  onChangeText={this.onInpuTextChange("supervisingPhysician")}
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
