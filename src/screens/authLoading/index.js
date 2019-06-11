/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
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

  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const {
      navigation: { navigate },
      store
    } = this.props;

    const { id, apiKey, isAuthenticated, wasAuthenticated } = await getAuthentication();
  
    if (!isAuthenticated && wasAuthenticated) return navigate("AccountSignIn");
    if (isAuthenticated && !store.providerStore.active) return navigate("ApplicationPending");
    if (!isAuthenticated) return navigate("Onboarding");
  
    const {
      store: {
        currentUserStore
      }
    } = this.props;
    const { address, application } = currentUserStore;
    currentUserStore.setAuthentication({ id, apiKey });

    const successHandler = res => {
      const {
        name,
        email,
        phone,
        street,
        city,
        state,
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
        .setState(state)
        .setZipCode(zip);

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

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#7F5DB0" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
