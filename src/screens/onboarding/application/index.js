/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
import React from "react";
// import axios from "axios";
import { Keyboard, Alert, Linking, SafeAreaView } from "react-native";
import { Avatar, ButtonGroup, CheckBox, Icon } from "react-native-elements";
import { inject, observer, PropTypes } from "mobx-react";
import ImagePicker from "react-native-image-picker";
import { FormTextInput, StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import { FormMaskedTextInput } from "@components/text-masked";
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
      street: "",
      city: "",
      state: "",
      avatarSource: "",
      dateOfBirth: "",
      licenseNumber: "",
      licenseType: "",
      licenseIssuer: "",
      licenseState: "",
      licenseCity: "",
      governmentIdNumber: "",
      governmentIdType: "",
      boardCertification: "",
      malpracticeInsurance: "",
      educationHistory: "",
      workHistory: "",
      specialties: "",
      whereHeard: "",
      supervisingPhysician: "",
      selectedIndexes: [],
      acceptedTermsOfService: false,
      acceptedPrivacy: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.onAddAvatar = this.onAddAvatar.bind(this);

    this.inputRefs = {};
  }

  onAddAvatar = _ => {
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
      return this.setState({
        ssn: value.substr(0, 4)
      });
    }

    return this.setState({
      [name]: value
    });
  };

  updateStore = _ => {
    const {
      store: {
        currentUserStore: { application, address }
      }
    } = this.props;

    const {
      street,
      city,
      state,
      licenseNumber,
      licenseType,
      licenseIssuer,
      licenseState,
      licenseCity,
      governmentIdNumber,
      governmentIdType,
      boardCertification,
      malpracticeInsurance,
      educationHistory,
      workHistory,
      specialties,
      whereHeard,
      supervisingPhysician,
      selectedIndexes,
      dateOfBirth,
      ssn,
      acceptedTermsOfService,
      acceptedPrivacy
    } = this.state;

    address
      .setStreet(street)
      .setCity(city)
      .setState(state);

    application
      .setDateOfBirth(dateOfBirth)
      .setLicenseNumber(licenseNumber)
      .setLicenseType(licenseType)
      .setLicenseIssuer(licenseIssuer)
      .setLicenseState(licenseState)
      .setLicenseCity(licenseCity)
      .setSSNLast4(ssn)
      /* }.setGovernmentIdCountry(governmentIdCountry) */
      .setGovernmentIdType(governmentIdType)
      .setGovernmentIdNumber(governmentIdNumber)
      .setBoardCertification(boardCertification)
      .setMalpracticeInsurance(malpracticeInsurance)
      .setEducationHistory(commaStringToArray(educationHistory))
      .setWorkHistory(commaStringToArray(workHistory))
      .setSpecialties(commaStringToArray(specialties))
      .setWhereHeard(whereHeard)
      .setSupervisingPhysician(supervisingPhysician)
      .setAcceptedTermsOfService(acceptedTermsOfService)
      .setAcceptedPrivacy(acceptedPrivacy)
      .setTitles(selectedIndexes.map(index => TITLES[index]));
  };

  onSubmit = _ => {
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
      return Alert.alert(`Please enter Date of Birth in \n mm/dd/yyyy format`);
    }

    const ssnPattern = /^[0-9]{4}/;
    if (!ssnPattern.test(ssn)) {
      return Alert.alert(
        "Please enter Social Security Number in 'XXXX' format"
      );
    }

    const { acceptedPrivacy, acceptedTermsOfService } = this.state;

    if (!acceptedPrivacy) {
      return Alert.alert("Please review our Privacy Policy to continue");
    }

    if (!acceptedTermsOfService) {
      return Alert.alert("Please review our Terms of Service to continue");
    }

    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address: { street, city, state, zip_code: zip },
      application: {
        dateOfBirth: dob,
        licenseNumber: license_number,
        licenseType: license_type,
        licenseIssuer: license_issuer,
        licenseState: license_state,
        licenseCity: license_city,
        governmentIdNumber: government_id_number,
        governmentIdType: government_id_type,
        boardCertification: certification,
        malpracticeInsurance: malpractice,
        educationHistory: education,
        workHistory: work_history,
        specialties,
        whereHeard: source,
        titles: title,
        supervisingPhysician: supervisor,
        acceptedPrivacy: accepted_privacy,
        acceptedTermsOfService: accepted_terms_of_service,
        ssnLast4: ssn_last_4
      }
    } = currentUserStore;

    const data = {
      care_provider: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        dob: new Date(dob),
        phone,
        zip,
        license_number,
        license_type,
        license_issuer,
        license_state,
        license_city,
        government_id_number,
        government_id_type,
        certification,
        malpractice,
        education,
        work_history,
        specialties,
        source,
        title,
        supervisor,
        accepted_terms_of_service,
        accepted_privacy,
        ssn_last_4,
        addresses_attributes: [
          {
            street,
            city,
            state,
            zip
          }
        ]
      }
    };

    const successHandler = response => {
      const { id, api_key: apiKey } = response.data;

      currentUserStore.setAuthentication({ id, apiKey });

      navigate("ApplicationPending");
    };

    const errorHandler = () => Alert.alert("Registration failed.");

    registerCareProvider(data, { successHandler, errorHandler });
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
      street,
      city,
      state,
      licenseNumber,
      licenseType,
      licenseIssuer,
      licenseState,
      licenseCity,
      governmentIdNumber,
      governmentIdType,
      ssn,
      boardCertification,
      malpracticeInsurance,
      educationHistory,
      workHistory,
      specialties,
      whereHeard,
      supervisingPhysician,
      selectedIndexes,
      acceptedTermsOfService,
      acceptedPrivacy
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
        <SafeAreaView style={{ flex: 1 }}>
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
            <FormWrapper style={{ paddingBottom: 0 }}>
              <FormInputWrapper>
                <FormMaskedTextInput
                  name="dateOfBirth"
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChangeText={this.handleInputChange("dateOfBirth")}
                  placeholder="mm/dd/yyyy"
                  maskOptions={{ mask: "99/99/9999" }}
                  returnKeyType="next"
                  ref={input => (this.inputRefs.dateOfBirth = input)}
                  keyboardType="number-pad"
                  onSubmitEditing={() =>
                    this.inputRefs.street.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>
              <FormInputWrapper>
                <FormTextInput
                  name="street"
                  label="Street Address"
                  value={street}
                  onChangeText={this.handleInputChange("street")}
                  placeholder="Street Address"
                  returnKeyType="next"
                  ref={input => (this.inputRefs.street = input)}
                  onSubmitEditing={() =>
                    this.inputRefs.city.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>

              <FormInputWrapper>
                <FormTextInput
                  name="city"
                  label="City"
                  value={city}
                  onChangeText={this.handleInputChange("city")}
                  placeholder="City"
                  returnKeyType="next"
                  ref={input => (this.inputRefs.city = input)}
                  onSubmitEditing={() =>
                    this.inputRefs.state.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>
              <FormInputWrapper>
                <FormTextInput
                  name="state"
                  label="State"
                  value={state}
                  onChangeText={this.handleInputChange("state")}
                  placeholder="State"
                  returnKeyType="next"
                  ref={input => (this.inputRefs.state = input)}
                  onSubmitEditing={() =>
                    this.inputRefs.licenseType.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>

              <FormInputWrapper>
                <FormTextInput
                  name="licenseType"
                  label="Medical License Type"
                  value={licenseType}
                  placeholder="Medical License Type"
                  returnKeyType="next"
                  ref={input => (this.inputRefs.licenseType = input)}
                  onChangeText={this.handleInputChange("licenseType")}
                  onSubmitEditing={() =>
                    this.inputRefs.licenseNumber.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>

              <FormInputWrapper>
                <FormTextInput
                  name="licenseNumber"
                  label="Medical License Number"
                  value={licenseNumber}
                  placeholder="Medical License Number"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  ref={input => (this.inputRefs.licenseNumber = input)}
                  onChangeText={this.handleInputChange("licenseNumber")}
                  onSubmitEditing={() =>
                    this.inputRefs.licenseIssuer.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>

              <FormInputWrapper>
                <FormTextInput
                  name="licenseIssuer"
                  label="Medical License Issuer"
                  value={licenseIssuer}
                  placeholder="Medical License Issuer"
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
                  label="Medical License City"
                  value={licenseCity}
                  placeholder="Medical License City"
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
                  label="Medical License State"
                  value={licenseState}
                  placeholder="Medical License State"
                  returnKeyType="next"
                  ref={input => (this.inputRefs.licenseState = input)}
                  onChangeText={this.handleInputChange("licenseState")}
                  onSubmitEditing={() =>
                    this.inputRefs.governmentIdType.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>
              <FormInputWrapper>
                <FormTextInput
                  name="governmentIdType"
                  label="Government ID Type"
                  value={governmentIdType}
                  placeholder="Driver's License, U.S. Passport, State ID, etc."
                  returnKeyType="next"
                  ref={input => (this.inputRefs.governmentIdType = input)}
                  onChangeText={this.handleInputChange("governmentIdType")}
                  onSubmitEditing={() =>
                    this.inputRefs.governmentIdNumber.getInnerRef().focus()
                  }
                  blurOnSubmit={false}
                />
              </FormInputWrapper>
              <FormInputWrapper>
                <FormTextInput
                  name="governmentIdNumber"
                  label="Government ID Number"
                  value={governmentIdNumber}
                  placeholder="Government ID Number"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  ref={input => (this.inputRefs.governmentIdNumber = input)}
                  onChangeText={this.handleInputChange("governmentIdNumber")}
                  onSubmitEditing={() => this.inputRefs.ssn.getInnerRef().focus()}
                  blurOnSubmit={false}
                />
              </FormInputWrapper>
              <FormInputWrapper>
                <FormTextInput
                  name="ssn"
                  label="SSN - Last 4 Digits"
                  value={ssn}
                  placeholder="1234"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  ref={input => (this.inputRefs.ssn = input)}
                  onChangeText={this.handleInputChange("ssn")}
                  onSubmitEditing={() => {
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
                  label="Insurance Policy Number"
                  value={malpracticeInsurance}
                  placeholder="Insurance Policy Number"
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
                  label="Current Employer"
                  value={workHistory}
                  placeholder="Current Employer"
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
                  placeholder="E.g. Facebook, A Friend"
                  returnKeyType="done"
                  ref={input => (this.inputRefs.whereHeard = input)}
                  onChangeText={this.handleInputChange("whereHeard")}
                  onSubmitEditing={
                    () => Keyboard.dismiss
                    // TODO: Make dismiss only if selectedIndexes.includes(0), otherwise, do below
                    // this.inputRefs.supervisingPhysician &&
                    // this.inputRefs.supervisingPhysician.getInnerRef().focus()
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
                    returnKeyType="done"
                    ref={input => (this.inputRefs.supervisingPhysician = input)}
                    onChangeText={this.handleInputChange("supervisingPhysician")}
                    onSubmitEditing={() => Keyboard.dismiss}
                  />
                </FormInputWrapper>
              )}
              <FormInputWrapper>
                <StyledText
                  style={{
                    fontSize: 16,
                    color: colors.BLACK60
                  }}
                >
                  By checking this box I affirm that I have read and understood
                Opear's{" "}
                  <StyledText
                    style={{
                      color: colors.BLUE,
                      textDecorationLine: 'underline',
                      textDecorationColor: colors.BLUE,
                      fontSize: 16
                    }}
                    onPress={() => Linking.openURL('https://www.opear.com/terms-conditions/')}>
                    Terms of Use
                </StyledText>{" "}
                  and{" "}
                  <StyledText
                    style={{
                      color: colors.BLUE,
                      textDecorationLine: "underline",
                      textDecorationColor: colors.BLUE,
                      fontSize: 16
                    }}
                    onPress={() =>
                      Linking.openURL("https://www.opear.com/privacy")
                    }
                  >
                    Privacy Policy
                </StyledText>{" "}
                  and agree to be bound by their terms.
              </StyledText>
                <CheckBox
                  title="I have read and accept"
                  checked={this.state.acceptedPrivacy}
                  onPress={() =>
                    this.setState({
                      acceptedPrivacy: !this.state.acceptedPrivacy
                    })
                  }
                  size={36}
                  textStyle={{ fontSize: 18 }}
                  containerStyle={{
                    backgroundColor: colors.WHITE,
                    borderColor: colors.WHITE,
                    paddingLeft: 0,
                    marginLeft: 0
                  }}
                  checkedIcon={"check-square"}
                  uncheckedIcon={"square-o"}
                  checkedColor={colors.SEAFOAMBLUE}
                />
                <StyledText
                  style={{
                    fontSize: 16,
                    color: colors.BLACK60,
                    marginTop: 20
                  }}
                >
                  I hereby affirm that I read and understood Opear's Terms of Use
                  and Privacy Policy and agree to be bound by their terms. I have
                  (and will maintain during my time as an Opear Provider) all
                  necessary malpractice and other insurance as required under
                  applicable law.
              </StyledText>
                <CheckBox
                  title="I have read and accept"
                  checked={this.state.acceptedTermsOfService}
                  onPress={() =>
                    this.setState({
                      acceptedTermsOfService: !this.state.acceptedTermsOfService
                    })
                  }
                  size={36}
                  textStyle={{ fontSize: 18 }}
                  containerStyle={{
                    backgroundColor: colors.WHITE,
                    borderColor: colors.WHITE,
                    paddingLeft: 0,
                    marginLeft: 0
                  }}
                  checkedIcon={"check-square"}
                  uncheckedIcon={"square-o"}
                  checkedColor={colors.SEAFOAMBLUE}
                />
              </FormInputWrapper>
            </FormWrapper>
            <FormInputWrapper
              style={{ marginBottom: 20, marginTop: 0, paddingTop: 0 }}
            >
              <ServiceButton title="Submit Application" onPress={this.onSubmit} />
            </FormInputWrapper>
          </KeyboardScrollView>
        </SafeAreaView>
      </ContainerView>
    );
  }
}

export default ApplicationScreen;
