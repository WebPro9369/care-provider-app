/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { Alert, ActivityIndicator, View, Linking } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getCareProvider } from "@services/opear-api";
import { getAuthentication } from "@services/authentication";
import { getFormattedDate } from "@utils/helpers";

@inject("store")
@observer
class AuthLoadingScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.tron.log(`Initial url is: ${url}`);
          return this.handleOpenURL(url);
        }
        return this.bootstrapAsync();
      })
      .catch(err => console.tron.log("Error getInitialURL", err));
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = url => {
    this.navigate(url);
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

  bootstrapAsync = async () => {
    const {
      navigation: { navigate }
    } = this.props;
    const {
      id,
      apiKey,
      isAuthenticated,
      wasAuthenticated
    } = await getAuthentication();

    if (!isAuthenticated && wasAuthenticated) return navigate("Authenticating");
    if (!isAuthenticated) return navigate("Onboarding");

    const {
      store: { currentUserStore }
    } = this.props;
    currentUserStore.setAuthentication({ id, apiKey });

    const successHandler = res => {
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
        dob: dateOfBirth,
        active,
        biography,
        addresses,
        rating
      } = res.data;

      if (!active) return navigate("ApplicationPending");

      const dob = getFormattedDate(new Date(dateOfBirth));

      const nameSplitted = (name || "").split(" ");
      const firstName = nameSplitted[0];
      const lastName =
        nameSplitted.length > 1 ? nameSplitted.splice(1).join(" ") : "";
      const { address, application } = currentUserStore;

      currentUserStore
        .setFirstName(firstName)
        .setLastName(lastName)
        .setEmail(email)
        .setPhone(phone)
        .setStripeBalance(stripe_balance)
        .setPayoutAccount(payout_account)
        .setRating(rating);

      address.setZipCode(zip);

      if (addresses && addresses.length > 0) {
        const addressData = addresses[addresses.length - 1];
        address
          .setName(addressData.name || "")
          .setStreet(addressData.street || "")
          .setCity(addressData.city || "")
          .setState(addressData.state || "");
      }

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
        .setGovernmentIdNumber(governmentIdNumber)
        .setBiography(biography);

      return navigate("Tabs");
    };

    const errorHandler = err => {
      if (err.response.status === 401) {
        navigate("Authenticating");
      }
      if (err.response.status === 500) {
        Alert.alert(
          "Error",
          "There was an error signing in to your account. Please try again later"
        );
      }
    };

    return getCareProvider(id, { successHandler, errorHandler });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#7F5DB0" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
