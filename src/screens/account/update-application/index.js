/* eslint-disable no-return-assign */
import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar, ButtonGroup } from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import { FormTextInput, StyledText } from "../../../components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import {
  ContainerView,
  FormInputWrapper,
  HeaderWrapper,
  FormWrapper,
  ViewCentered
} from "@components/views";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { updateCareProvider } from "@services/opear-api";
import { colors, TITLES } from "@utils/constants";
import { commaStringToArray } from "@utils/helpers";

const imgDoctor = require("../../../../assets/images/Doctor.png");

@inject("store")
@observer
class UpdateApplicationScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const { store: { currentUserStore }} = props;

    const { application: {
      street,
      city,
      state,
      dateOfBirth,
      licenseNumber,
      licenseType,
      licenseIssuer,
      /* licenseCountry, */
      licenseState,
      licenseCity,
      govermentIdNumber,
      /* govermentIdCountry, */
      govermentIdType,
      boardCertification,
      malpracticeInsurance,
      educationHistory,
      workHistory,
      specialties,
      /*offeredServices,*/
      whereHeard,
      supervisingPhysician,
      titles,
    }} = currentUserStore;

    this.state = {
      street,
      city,
      state,
      dateOfBirth,
      licenseNumber,
      licenseType,
      licenseIssuer,
      /* licenseCountry, */
      licenseState,
      licenseCity,
      govermentIdNumber,
      /* govermentIdCountry, */
      govermentIdType,
      boardCertification,
      malpracticeInsurance,
      educationHistory: educationHistory.join(', '),
      workHistory: workHistory.join(', '),
      specialties: specialties.join(', '),
      /*offeredServices: offeredServices.join(', '),*/
      whereHeard,
      supervisingPhysician,
      selectedIndexes: titles.map(title => TITLES.indexOf(title)),
    };

    this.updateIndex = this.updateIndex.bind(this);
    this.updateStore = this.updateStore.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.setState({
      [name]: value
    });
  };

  updateStore() {
    const {
      store: { currentUserStore : { application, address }}
    } = this.props;

    const {
      street,
      city,
      state,
      dateOfBirth,
      licenseNumber,
      licenseType,
      licenseIssuer,
      /* licenseCountry, */
      licenseState,
      licenseCity,
      govermentIdNumber,
      /* govermentIdCountry, */
      govermentIdType,
      boardCertification,
      malpracticeInsurance,
      educationHistory,
      workHistory,
      specialties,
      /*offeredServices,*/
      whereHeard,
      supervisingPhysician,
      selectedIndexes,
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
      /* .setLicenseCountry(licenseCountry) */
      .setLicenseState(licenseState)
      .setLicenseCity(licenseCity)
      /* .setGovermentIdCountry(govermentIdCountry) */
      .setGovermentIdType(govermentIdType)
      .setGovermentIdNumber(govermentIdNumber)
      .setBoardCertification(boardCertification)
      .setMalpracticeInsurance(malpracticeInsurance)
      .setEducationHistory(commaStringToArray(educationHistory))
      .setWorkHistory(commaStringToArray(workHistory))
      .setSpecialties(commaStringToArray(specialties))
      /*.setOfferedServices(commaStringToArray(offeredServices))*/
      .setWhereHeard(whereHeard)
      .setSupervisingPhysician(supervisingPhysician)
      .setTitles(selectedIndexes.map(index => TITLES[index]));
  }

  updateIndex(selectedIndexes) {
    this.setState({ selectedIndexes });
  }

  onSubmit = _ => {
    const {
      store: { currentUserStore: { id } },
      navigation: { navigate },
    } = this.props;

    let {
      dateOfBirth,
      street,
      city,
      state,
      licenseNumber: license_number,
      licenseType: license_type,
      licenseIssuer: license_issuer,
      /* licenseCountry: license_country, */
      licenseState: license_state,
      licenseCity: license_city,
      govermentIdNumber: government_id_number,
      /* govermentIdCountry: government_id_country, */
      govermentIdType: government_id_type,
      boardCertification: certification,
      malpracticeInsurance: malpractice,
      educationHistory: education,
      workHistory: work_history,
      specialties,
      /*offeredServices: offered_services,*/
      whereHeard: source,
      selectedIndexes,
      supervisingPhysician: supervisor
    } = this.state;

    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(dateOfBirth) && !dateRegex2.test(dateOfBirth)) {
      return Alert.alert("Please enter DoB in \n mm/dd/yyyy format");
    }

    const title = selectedIndexes.map(index => TITLES[index]);

    const data = {
      care_provider: {
        dob: new Date(dateOfBirth),
        license_number,
        license_type,
        license_issuer,
        /* license_country, */
        license_state,
        license_city,
        government_id_number,
        /* government_id_country, */
        government_id_type,
        certification,
        malpractice,
        /*legal_history,*/
        education: commaStringToArray(education),
        work_history: commaStringToArray(work_history),
        specialties: commaStringToArray(specialties),
        /*offered_services: commaStringToArray(offered_services),*/
        source,
        title,
        supervisor
      }
    };

    const successHandler = _ => {
      this.updateStore();
      return navigate("AccountDefault");
    };

    const errorHandler = () => Alert.alert("Update failed.");

    updateCareProvider(id, data, { successHandler, errorHandler });
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
      /* licenseCountry, */
      licenseState,
      licenseCity,
      govermentIdNumber,
      /* govermentIdCountry, */
      govermentIdType,
      boardCertification,
      malpracticeInsurance,
      educationHistory,
      workHistory,
      specialties,
      /*offeredServices,*/
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
                onChangeText={this.handleInputChange("dateOfBirth")}
                onSubmitEditing={() =>
                  this.inputRefs.licenseNumber.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="street"
                label="Street Address"
                value={street}
                onChangeText={this.handleInputChange('street')}
                placeholder="Street Address"
                returnKeyType="next"
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
                onChangeText={this.handleInputChange('city')}
                placeholder="City"
                returnKeyType="next"
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
                onChangeText={this.handleInputChange('state')}
                placeholder="State"
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
                label="Medical License Number"
                value={licenseNumber}
                placeholder="Medical License Number"
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
                label="Medical License Type"
                value={licenseType}
                placeholder="Medical License Type"
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
            {/* <FormInputWrapper>
              <FormTextInput
                name="licenseCountry"
                label="License Country"
                value={licenseCountry}
                placeholder="License Country"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseCountry = input)}
                onChangeText={this.handleInputChange("licenseCountry")}
                onSubmitEditing={() =>
                  this.inputRefs.govermentIdCountry.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper> */}
            {/* <FormInputWrapper>
              <FormTextInput
                name="govermentIdCountry"
                label="Goverment ID Country"
                value={govermentIdCountry}
                placeholder="Goverment ID Country"
                returnKeyType="next"
                ref={input => (this.inputRefs.govermentIdCountry = input)}
                onChangeText={this.handleInputChange("govermentIdCountry")}
                onSubmitEditing={() =>
                  this.inputRefs.govermentIdType.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper> */}
            <FormInputWrapper>
              <FormTextInput
                name="govermentIdType"
                label="Goverment ID Type"
                value={govermentIdType}
                placeholder="Driver's License, U.S. Passport, State ID, etc."
                returnKeyType="next"
                ref={input => (this.inputRefs.govermentIdType = input)}
                onChangeText={this.handleInputChange("govermentIdType")}
                onSubmitEditing={() =>
                  this.inputRefs.govermentIdNumber.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                name="govermentIdNumber"
                label="Goverment ID Number"
                value={govermentIdNumber}
                placeholder="Goverment ID Number"
                returnKeyType="next"
                ref={input => (this.inputRefs.govermentIdNumber = input)}
                onChangeText={this.handleInputChange("govermentIdNumber")}
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
            {/*}<FormInputWrapper>
              <FormTextInput
                name="offeredServices"
                label="Offered Services"
                value={offeredServices}
                placeholder="Service 1, service 2, etc."
                returnKeyType="next"
                ref={input => (this.inputRefs.offeredServices = input)}
                onChangeText={this.handleInputChange("offeredServices")}
                onSubmitEditing={() =>
                  this.inputRefs.supervisingPhysician.getInnerRef().focus()
                }
                blurOnSubmit={false}
              />
            </FormInputWrapper> */}
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

export default UpdateApplicationScreen;
