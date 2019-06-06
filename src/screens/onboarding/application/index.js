/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
import React from "react";
// import axios from "axios";
import { Alert } from "react-native";
import { Avatar, ButtonGroup } from "react-native-elements";
import { inject, observer, PropTypes } from "mobx-react";
import ImagePicker from "react-native-image-picker";
import { FormTextInput, StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import {
  ContainerView,
  FormInputWrapper,
  HeaderWrapper,
  FormWrapper,
  ViewCentered
} from "@components/views";
import { KeyboardScrollView } from "@components/views/keyboard-scroll-view";
import { registerCareProvider } from "@services/opear-api";
import { colors, TITLES } from "@utils/constants";
import { commaStringToArray } from "@utils/helpers";

@inject("store")
@observer
class ApplicationScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      ssn: "",
      maskedSsn: "",
      avatarSource: "",
      dateOfBirth: "",
      licenseNumber: "",
      licenseType: "",
      licenseIssuer: "",
      licenseCountry: "",
      licenseState: "",
      licenseCity: "",
      boardCertification: "",
      malpracticeInsurance: "",
      educationHistory: "",
      workHistory: "",
      specialties: "",
      offeredServices: "",
      legalHistory: "",
      references: "",
      whereHeard: "",
      supervisingPhysician: "",
      selectedIndexes: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.onAddAvatar = this.onAddAvatar.bind(this);

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

  handleInputChange = name => value => {
    if (name === "ssn") {
      let val = value.replace(/\D/g, "");
      let newVal = "";
      let maskedSsn = "";
      if (val.length > 4) {
        maskedSsn = val;
      }
      if (val.length > 3 && val.length < 6) {
        newVal += `${val.substr(0, 3)}-`;
        val = val.substr(3);
      }
      if (val.length > 5) {
        newVal += `${val.substr(0, 3)}-`;
        newVal += `${val.substr(3, 2)}-`;
        val = val.substr(5);
      }
      newVal += val;
      maskedSsn = newVal.substring(0, 11);

      return this.setState({
        ssn: maskedSsn,
        maskedSsn
      });
    }

    return this.setState({
      [name]: value
    });
  };

  hideSsnDigits = () => {
    const { maskedSsn } = this.state;
    let hiddenSss = "";
    if (maskedSsn.length > 10) {
      hiddenSss = `XXX-XX-${maskedSsn.substr(7, 4)}`;
    }
    this.setState({
      maskedSsn: hiddenSss
    });
  };

  updateStore = () => {
    const {
      store: {
        currentUserStore: { application }
      }
    } = this.props;

    const {
      licenseNumber,
      licenseType,
      licenseIssuer,
      licenseCountry,
      licenseState,
      licenseCity,
      boardCertification,
      malpracticeInsurance,
      legalHistory,
      educationHistory,
      workHistory,
      specialties,
      offeredServices,
      references,
      whereHeard,
      supervisingPhysician,
      selectedIndexes,
      dateOfBirth,
      maskedSsn
    } = this.state;

    application
      .setDateOfBirth(dateOfBirth)
      .setLicenseNumber(licenseNumber)
      .setLicenseType(licenseType)
      .setLicenseIssuer(licenseIssuer)
      .setLicenseCountry(licenseCountry)
      .setLicenseState(licenseState)
      .setLicenseCity(licenseCity)
      .setSSNLast4(maskedSsn.substr(7, 4))
      .setBoardCertification(boardCertification)
      .setMalpracticeInsurance(malpracticeInsurance)
      .setLegalHistory(legalHistory)
      .setEducationHistory(commaStringToArray(educationHistory))
      .setWorkHistory(commaStringToArray(workHistory))
      .setSpecialties(commaStringToArray(specialties))
      .setOfferedServices(commaStringToArray(offeredServices))
      .setReferences(references)
      .setWhereHeard(whereHeard)
      .setSupervisingPhysician(supervisingPhysician)
      .setTitles(selectedIndexes.map(index => TITLES[index]));
  };

  onSubmit = () => {
    this.updateStore();

    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;
    const { dateOfBirth, ssn } = this.state;

    console.tron.log("User data: ", currentUserStore.toJSON());

    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(dateOfBirth) && !dateRegex2.test(dateOfBirth)) {
      return Alert.alert(`Please enter DoB in \n mm/dd/yyyy format`);
    }

    const ssnPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
    if (!ssnPattern.test(ssn)) {
      return Alert.alert(
        "Please enter Social Security Number in 'XXX-XX-XXXX' format"
      );
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address: { zip_code: zip },
      application: {
        licenseNumber: license_number,
        licenseType: license_type,
        licenseIssuer: license_issuer,
        licenseCountry: license_country,
        licenseState: license_state,
        licenseCity: license_city,
        ssnLast4: ssn_last4,
        boardCertification: certification,
        malpracticeInsurance: malpractice,
        legalHistory: legal_history,
        educationHistory: education,
        workHistory: work_history,
        specialties,
        references,
        offeredServices: offered_services,
        whereHeard: source,
        titles: title
      }
    } = currentUserStore;

    const data = {
      care_provider: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        dob: dateOfBirth,
        phone,
        zip,
        license_number,
        license_type,
        license_issuer,
        license_country,
        license_state,
        license_city,
        ssn_last4,
        certification,
        malpractice,
        legal_history,
        references,
        education,
        work_history,
        specialties,
        offered_services,
        source,
        title
      }
    };

    const successHandler = response => {
      const { id, api_key: apiKey } = response.data;

      currentUserStore.setAuthentication({ id, apiKey });

      navigate("TabDashboard");
    };

    const errorHandler = () => Alert.alert("Registration failed.");

    return registerCareProvider(data, { successHandler, errorHandler });
  };

  updateIndex = selectedIndexes => {
    this.setState({ selectedIndexes });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const buttons = TITLES;
    const {
      avatarSource,
      dateOfBirth,
      licenseNumber,
      licenseType,
      licenseIssuer,
      licenseCountry,
      licenseState,
      licenseCity,
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
        <KeyboardScrollView keyboardShouldPersistTaps="handled">
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
                onChangeText={this.handleInputChange("dateOfBirth")}
                placeholder="mm/dd/yyyy"
                returnKeyType="next"
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
                onChangeText={this.handleInputChange("licenseNumber")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseType.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseType"
                label="License Type"
                value={licenseType}
                placeholder="License Type"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseType = input)}
                onChangeText={this.handleInputChange("licenseType")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseIssuer.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseIssuer"
                label="License Issuer"
                value={licenseIssuer}
                placeholder="License Issuer"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseIssuer = input)}
                onChangeText={this.handleInputChange("licenseIssuer")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseCity.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseCity"
                label="License City"
                value={licenseCity}
                placeholder="License City"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseCity = input)}
                onChangeText={this.handleInputChange("licenseCity")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseState.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseState"
                label="License State"
                value={licenseState}
                placeholder="License State"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseState = input)}
                onChangeText={this.handleInputChange("licenseState")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseCountry.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="licenseCountry"
                label="License Country"
                value={licenseCountry}
                placeholder="License Country"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseCountry = input)}
                onChangeText={this.handleInputChange("licenseCountry")}
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
                onChangeText={this.handleInputChange("ssn")}
                onSubmitEditing={() => {
                  this.hideSsnDigits();
                  this.inputRefs.boardCertification.getInnerRef().focus();
                }}
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
                onChangeText={this.handleInputChange("boardCertification")}
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
                onChangeText={this.handleInputChange("malpracticeInsurance")}
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
                onChangeText={this.handleInputChange("educationHistory")}
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
                onChangeText={this.handleInputChange("workHistory")}
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
                onChangeText={this.handleInputChange("specialties")}
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
                onChangeText={this.handleInputChange("offeredServices")}
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
                onChangeText={this.handleInputChange("legalHistory")}
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
                onChangeText={this.handleInputChange("references")}
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
                onChangeText={this.handleInputChange("whereHeard")}
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
                  onChangeText={this.handleInputChange("supervisingPhysician")}
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
