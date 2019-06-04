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
      titles,
    }} = currentUserStore;

    this.state = {
      dateOfBirth: '',
      dateOfBirth: '',
      licenseNumber,
      boardCertification,
      malpracticeInsurance,
      educationHistory: educationHistory.join(', '),
      workHistory: workHistory.join(', '),
      specialties: specialties.join(', '),
      offeredServices: offeredServices.join(', '),
      legalHistory,
      references,
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
      store: { currentUserStore : { application }}
    } = this.props;

    const {
      dateOfBirth,
      licenseNumber,
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
    } = this.state;

    application
      .setDateOfBirth(dateOfBirth)
      .setLicenseNumber(licenseNumber)
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
      licenseNumber: license,
      boardCertification: certification,
      malpracticeInsurance: malpractice,
      legalHistory: legal_history,
      educationHistory: education,
      workHistory: work_history,
      specialties,
      references,
      offeredServices: offered_services,
      whereHeard: source,
      selectedIndexes,
    } = this.state;
    
    const dateRegex1 = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const dateRegex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

    if (!dateRegex1.test(dateOfBirth) && !dateRegex2.test(dateOfBirth)) {
      return Alert.alert("Please enter DoB in \n mm/dd/yyyy format");
    }

    const title = selectedIndexes.map(index => TITLES[index]);

    const data = {
      care_provider: {
        dob: dateOfBirth,
        license,
        certification,
        malpractice,
        legal_history,
        references,
        education: commaStringToArray(education),
        work_history: commaStringToArray(work_history),
        specialties: commaStringToArray(specialties),
        offered_services: commaStringToArray(offered_services),
        source,
        title,
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
                name="licenseNumber"
                label="License Number"
                value={licenseNumber}
                placeholder="License Number"
                returnKeyType="next"
                ref={input => (this.inputRefs.licenseNumber = input)}
                onChangeText={this.handleInputChange("licenseNumber")}
                onSubmitEditing={() => this.inputRefs.ssn.getInnerRef().focus()}
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

export default UpdateApplicationScreen;
