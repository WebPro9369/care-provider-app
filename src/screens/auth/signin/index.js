/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React from "react";
import { Alert, Linking } from "react-native";
import { inject, PropTypes } from "mobx-react";
import { FormTextInput, StyledText } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { ServiceButton } from "@components/service-button";
import { ViewCentered, FormInputWrapper, FormWrapper } from "@components/views";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { colors } from "@utils/constants";
import { getCareProvider, getApiToken } from "@services/opear-api";
import { getFormattedDate } from "@utils/helpers";

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

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  navigate = url => {
    const {
      navigation: { navigate }
    } = this.props;
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];

    if (routeName === "newpwd") {
      navigate("AccountNewPwd", { routeInfo: route });
    }
  };

  onSubmit = () => {
    const { email, password } = this.state;
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;

    const successHandler = res => {
      if (res.data.message) {
        return Alert.alert(
          "There was an issue",
          "Incorrect credentials. Please try again."
        );
      }

      const { id, api_key: apiKey } = res.data;
      currentUserStore.setAuthentication({ id, apiKey });

      const successHandler = res => {
        const { address, application } = currentUserStore;

        const {
          name,
          email,
          phone,
          zip,
          certification,
          title: titles,
          malpractice,
          license_number: licenseNumber,
          license_type: licenseType,
          license_issuer: licenseIssuer,
          license_country: licenseCountry,
          license_state: licenseState,
          license_city: licenseCity,
          government_id_country: governmentIdCountry,
          government_id_type: governmentIdType,
          government_id_number: governmentIdNumber,
          education,
          work_history: workHistory,
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

        address.setZipCode(zip);

        application
          .setBoardCertification(certification)
          .setTitles(titles)
          .setMalpracticeInsurance(malpractice)
          .setSupervisingPhysician(supervisor)
          .setEducationHistory(education)
          .setWorkHistory(workHistory)
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
          .setGovernmentIdType(governmentIdType)
          .setGovernmentIdCountry(governmentIdCountry)
          .setGovernmentIdNumber(governmentIdNumber);

        navigate("Tabs");
      };

      return getCareProvider(id, { successHandler });
    };

    getApiToken(email, password, { successHandler });
  };

  onPressForgotPassword = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("AccountForgotPwd");
    return true;
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
            <ViewCentered style={{ flexDirection: "row" }}>
              <StyledText
                style={{ color: "#ffffff" }}
                onPress={this.onPressSignUp}
              >
                sign up
              </StyledText>
              <StyledText style={{ color: "#ffffff" }}> | </StyledText>
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
