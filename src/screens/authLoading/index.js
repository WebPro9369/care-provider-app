/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { getCareProvider } from "@services/opear-api";

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
      navigation: { navigate }
    } = this.props;

    AsyncStorage.getItem("currentUser").then(data => {
      if (!data) return navigate("Onboarding");

      const { id, apiKey } = JSON.parse(data);

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
          zip,
          license,
          certification,
          title: titles,
          malpractice,
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
          .setLicenseNumber(license)
          .setBoardCertification(certification)
          .setTitles(titles)
          .setMalpracticeInsurance(malpractice)
          .setLegalHistory(legalHistory)
          // TODO: handle nulls
          // .setBiography(biography)
          // .setSupervisingPhysician(supervisor)
          .setEducationHistory(education)
          .setWorkHistory(workHistory)
          .setReferences(references)
          .setSpecialties(specialties)
          .setOfferedServices(offeredServices)
          .setWhereHeard(source)
          .setDateOfBirth(dateOfBirth);

        navigate("Tabs");
      };

      getCareProvider(id, { successHandler });
      return navigate("Tabs");
    });
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
