/* eslint-disable no-return-assign */
import React from "react";
import { Alert } from "react-native";
import { Avatar, ButtonGroup } from "react-native-elements";
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
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { colors } from "../../../utils/constants";

const imgDoctor = require("../../../../assets/images/Doctor.png");

class UpdateApplicationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOfBirth: null,
      licenseNumber: "1234567",
      ssn: null,
      maskedSsn: null,
      boardCertification: "My board certification",
      malpracticeInsurance: "My malpractice insurance",
      educationHistory: "My education history",
      workHistory: "My work history",
      specialties: "My specialties",
      offeredServices: "My offered services",
      legalHistory: "My legal history (sued?)",
      references: "Two references",
      whereHeard: "Where did you hear about us?",
      supervisingPhysician: null,
      selectedIndexes: [0]
    };

    this.updateIndex = this.updateIndex.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddAvatar = this.onAddAvatar.bind(this);
    this.onInpuTextChange = this.onInpuTextChange.bind(this);

    this.inputRefs = {};
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

  onSubmit() {
    const {
      navigation: { navigate }
    } = this.props;
    const { dateOfBirth, ssn } = this.state;
    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(dateOfBirth) && !dateRegex2.test(dateOfBirth)) {
      return Alert.alert("Please enter DoB in mm/dd/yyyy format");
    }

    const ssnPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
    if (!ssnPattern.test(ssn)) {
      return Alert.alert(
        "Please enter Social Security Number in 'XXX-XX-XXXX' format"
      );
    }

    return navigate("AccountDefault");
  }

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
          source: imgDoctor
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
                returnKeyType="next"
                onChangeText={this.onInpuTextChange("dateOfBirth")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseNumber.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseNumber"
                label="License Number"
                value={licenseNumber}
                placeholder="License Number"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseNumber = input)}
                onChangeText={this.onInpuTextChange("licenseNumber")}
                onSubmitEditing={() => this.inputRefs.ssn.getInnerRef().focus()}
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="ssn"
                label="Social Security Number"
                value={maskedSsn || ssn}
                placeholder="123-45-6789"
                returnKeyType="next"
                ref={input => (this.inputRefs.ssn = input)}
                onChangeText={this.onInpuTextChange("ssn")}
                onSubmitEditing={() =>
                  this.inputRefs.boardCertification.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="boardCertification"
                label="Board Certification"
                value={boardCertification}
                placeholder="Board Certification"
                returnKeyType="next"
                ref={input => (this.inputRefs.boardCertification = input)}
                onChangeText={this.onInpuTextChange("boardCertification")}
                onSubmitEditing={() =>
                  this.inputRefs.malpracticeInsurance.getInnerRef().focus()
                }
                blurOnSubmit={false}
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
                returnKeyType="next"
                ref={input => (this.inputRefs.malpracticeInsurance = input)}
                onChangeText={this.onInpuTextChange("malpracticeInsurance")}
                onSubmitEditing={() =>
                  this.inputRefs.educationHistory.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="educationHistory"
                label="Education History"
                value={educationHistory}
                placeholder="Education History"
                returnKeyType="next"
                ref={input => (this.inputRefs.educationHistory = input)}
                onChangeText={this.onInpuTextChange("educationHistory")}
                onSubmitEditing={() =>
                  this.inputRefs.workHistory.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="workHistory"
                label="Work History"
                value={workHistory}
                placeholder="Work History"
                returnKeyType="next"
                ref={input => (this.inputRefs.workHistory = input)}
                onChangeText={this.onInpuTextChange("workHistory")}
                onSubmitEditing={() =>
                  this.inputRefs.specialties.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="specialties"
                label="Specialties"
                value={specialties}
                placeholder="Specialty 1, specialty 2, etc."
                returnKeyType="next"
                ref={input => (this.inputRefs.specialties = input)}
                onChangeText={this.onInpuTextChange("specialties")}
                onSubmitEditing={() =>
                  this.inputRefs.offeredServices.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="offeredServices"
                label="Offered Services"
                value={offeredServices}
                placeholder="Service 1, service 2, etc."
                returnKeyType="next"
                ref={input => (this.inputRefs.offeredServices = input)}
                onChangeText={this.onInpuTextChange("offeredServices")}
                onSubmitEditing={() =>
                  this.inputRefs.legalHistory.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="legalHistory"
                label="Legal History"
                value={legalHistory}
                placeholder="Legal History"
                returnKeyType="next"
                ref={input => (this.inputRefs.legalHistory = input)}
                onChangeText={this.onInpuTextChange("legalHistory")}
                onSubmitEditing={() =>
                  this.inputRefs.references.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="references"
                label="References"
                value={references}
                placeholder="References"
                returnKeyType="next"
                ref={input => (this.inputRefs.references = input)}
                onChangeText={this.onInpuTextChange("references")}
                onSubmitEditing={() =>
                  this.inputRefs.whereHeard.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="whereHeard"
                label="Where did you hear about us?"
                value={whereHeard}
                placeholder="Where did you hear about us?"
                returnKeyType="next"
                ref={input => (this.inputRefs.whereHeard = input)}
                onChangeText={this.onInpuTextChange("whereHeard")}
                onSubmitEditing={() =>
                  this.inputRefs.supervisingPhysician &&
                  this.inputRefs.supervisingPhysician.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            {selectedIndexes.includes(0) ? null : (
              <FormInputWrapper>
                <FormTextInput
                  name="supervisingPhysician"
                  label="Supervising Physician"
                  value={supervisingPhysician}
                  placeholder="Supervising Physician"
                  returnKeyType="next"
                  ref={input => (this.inputRefs.supervisingPhysician = input)}
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

export default UpdateApplicationScreen;
