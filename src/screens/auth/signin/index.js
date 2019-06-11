import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { FormTextInput, StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import { ViewCentered, FormInputWrapper, FormWrapper } from "@components/views";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { colors } from "@utils/constants";
import { getCareProvider, getApiToken } from "@services/opear-api";
import { getFormattedDate } from "@utils/helpers";
import { sendEmail } from "@utils/ses_sendemail";

@inject("store")
class SignInScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  onSubmit = () => {
    const { email, password } = this.state;
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;

    const successHandler = res => {
      if (res.data.message) {
        return Alert.alert(`Incorrect credentials. Please try again.`);
      }

      const { id, api_key: apiKey } = res.data;
      currentUserStore.setAuthentication({ id, apiKey });

      const successHandler = res => {
        const { address, application } = currentUserStore;

        const {
          name,
          email,
          phone,
          street,
          city,
          state,
          certification,
          title: titles,
          malpractice,
          license_number: licenseNumber,
          license_type: licenseType,
          license_issuer: licenseIssuer,
          license_country: licenseCountry,
          license_state: licenseState,
          license_city: licenseCity,
          government_id_country: govermentIdCountry,
          government_id_type: govermentIdType,
          government_id_number: govermentIdNumber,
          legal_history: legalHistory,
          education,
          work_history: workHistory,
          references,
          specialties,
          offered_services: offeredServices,
          source,
          supervisor,
          stripe_balance,
          payout_account,
          dob: dateOfBirth
        } = res.data;

        const dob = getFormattedDate(new Date(dateOfBirth));

        const [firstName, lastName] = name.split(" ");

        currentUserStore
          .setFirstName(firstName)
          .setLastName(lastName)
          .setEmail(email)
          .setPhone(phone)
          .setStripeBalance(stripe_balance)
          .setPayoutAccount(payout_account);

        address
          .setStreet(street)
          .setCity(city)
          .setState(state);

        application
          .setBoardCertification(certification)
          .setTitles(titles)
          .setMalpracticeInsurance(malpractice)
          .setLegalHistory(legalHistory)
          .setSupervisingPhysician(supervisor)
          .setEducationHistory(education)
          .setWorkHistory(workHistory)
          .setReferences(references)
          .setSpecialties(specialties)
          .setOfferedServices(offeredServices)
          .setWhereHeard(source)
          .setDateOfBirth(dob)
          .setLicenseNumber(licenseNumber)
          .setLicenseType(licenseType)
          .setLicenseIssuer(licenseIssuer)
          .setLicenseCountry(licenseCountry)
          .setLicenseState(licenseState)
          .setLicenseCity(licenseCity)
          .setGovermentIdType(govermentIdType)
          .setGovermentIdCountry(govermentIdCountry)
          .setGovermentIdNumber(govermentIdNumber);

        navigate("Tabs");
      };

      getCareProvider(id, { successHandler });
    };

    getApiToken(email, password, { successHandler });
  };

  onPressForgotPassword = () => {
    const {
      navigation: { navigate },
      store: { currentUserStore, providerStore }
    } = this.props;

    currentUserStore.setEmail("test");
    providerStore.setActive(true);

    if(providerStore.active) {
      sendEmail(currentUserStore.email, "passwordReset");
      Alert.alert("Reset requested.","Check your email to reset your password.");
      return true;
    }

    Alert.alert("Please register.","You'll need to make an account first.");

    return false;
  };

  onPressSignUp = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("Onboarding");
    return true;
  };

  handleEmailChange = text => {
    this.setState({
      email: text
    });
  };

  handlePwdChange = text => {
    this.setState({
      password: text
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ backgroundColor: colors.LIGHTGREEN, height: "100%" }}
      >
        <NavHeader
          title="Sign In"
          size="medium"
          hasBackButton={false}
          serviceTextStyle={{ color: "#ffffff" }}
        />
        <FormWrapper centered padding={0} style={{ marginTop: 32 }}>
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Email"
              value={email}
              placeholder="name@domain.com"
              color="#ffffff"
              onChangeText={this.handleEmailChange}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Password"
              value={password}
              placeholder="Enter password"
              type="password"
              color="#ffffff"
              onChangeText={this.handlePwdChange}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingBottom={6} style={{ marginBottom: 0 }}>
            <ServiceButton
              title="Sign In"
              onPress={this.onSubmit}
              backgroundColor="#ffffff"
              color={colors.LIGHTGREEN}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingTop={6}>
            <ViewCentered
              style={{ flexDirection: "row" }}
            >
              <StyledText
                style={{ color: "#ffffff" }}
                onPress={this.onPressSignUp}
              >
                sign up
              </StyledText>
              <StyledText style={{ color: "#ffffff" }}>  |  </StyledText>
              <StyledText
                style={{ color: "#ffffff" }}
                onPress={this.onPressForgotPassword}
              >
                forgot password?
              </StyledText>
            </ViewCentered>
          </FormInputWrapper>
        </FormWrapper>
      </KeyboardAvoidingView>
    );
  }
}

export default SignInScreen;
