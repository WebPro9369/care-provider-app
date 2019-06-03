/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { AsyncStorage } from "react-native";
import { API_SETTINGS } from '@services/opear-api';
import AddressStore from "../address";

const ApplicationStore = types
  .model("ApplicationStore", {
      dateOfBirth: types.string,
      biography: types.string,
      licenseNumber: types.string,
      boardCertification: types.string,
      malpracticeInsurance: types.string,
      educationHistory: types.array(types.string),
      workHistory: types.array(types.string),
      specialties: types.array(types.string),
      offeredServices: types.array(types.string),
      legalHistory: types.string,
      references: types.string,
      whereHeard: types.string,
      supervisingPhysician: types.string,
      titles: types.array(types.string),
  })
  .actions(self => ({
    setDateOfBirth(value) {
      self.dateOfBirth = value;
      return self;
    },
    setBiography(value) {
      self.biography = value;
      return self;
    },
    setLicenseNumber(value) {
      self.licenseNumber = value;
      return self;
    },
    setBoardCertification(value) {
      self.boardCertification = value;
      return self;
    },
    setMalpracticeInsurance(value) {
      self.malpracticeInsurance = value;
      return self;
    },
    setEducationHistory(value) {
      self.educationHistory = value;
      return self;
    },
    setWorkHistory(value) {
      self.workHistory = value;
      return self;
    },
    setSpecialties(value) {
      self.specialties = value;
      return self;
    },
    setOfferedServices(value) {
      self.offeredServices = value;
      return self;
    },
    setLegalHistory(value) {
      self.legalHistory = value;
      return self;
    },
    setReferences(value) {
      self.references = value;
      return self;
    },
    setWhereHeard(value) {
      self.whereHeard = value;
      return self;
    },
    setSupervisingPhysician(value) {
      self.supervisingPhysician = value;
      return self;
    },
    setTitles(value) {
      self.titles = value;
      return self;
    }
  }));

  const PayoutAccountStore = types
  .model("PayoutAccountStore", {
      token_id: types.maybeNull(types.string),
      last4: types.maybeNull(types.string)
  })
  .actions(self => ({
    setTokenId(value) {
      self.token_id = value;
      return self;
    },
    setLast4(value) {
      self.last4 = value;
      return self;
    }
  }));

export const CurrentUserStore = types
  .model("CurrentUserStore", {
		id: types.number,
		apiKey: types.string,
    password: types.optional(types.string, ''),
    email: types.string,
    firstName: types.string,
    lastName: types.string,
    phone: types.string,
    application: types.optional(ApplicationStore, {
      dateOfBirth: '',
      biography: '',
      licenseNumber: '',
      boardCertification: '',
      malpracticeInsurance: '',
      educationHistory: [],
      workHistory: [],
      specialties: [],
      offeredServices: [],
      legalHistory: '',
      references: '',
      whereHeard: '',
      supervisingPhysician: '',
      titles: [],
    }),
    address: types.optional(AddressStore, {
      name: '',
      street: '',
      city: '',
      state: '',
      zip_code: '',
      apartment_number: '',
      latitude: '',
      longitude: '',
    }),
    payout_account: types.optional(PayoutAccountStore, {}),
    stripe_balance: types.maybeNull(types.number)
  })
  .actions(self => ({
		setID(value) {
      self.id = value;
      return self;
		},
    setAPIKey(value) {
      self.apiKey = value;
      return self;
    },
    setAuthentication({ id, apiKey}) {
      AsyncStorage.setItem('currentUser', JSON.stringify({ id, apiKey }));
      self.setID(id).setAPIKey(apiKey);
      API_SETTINGS.apiKey = apiKey;

      return self;
    },
    setPassword(value) {
      self.password = value;
      return self;
    },
    setEmail(value) {
      self.email = value;
      return self;
    },
    setFirstName(value) {
      self.firstName = value;
      return self;
    },
    setLastName(value) {
      self.lastName = value;
      return self;
    },
    setPhone(value) {
      self.phone = value;
      return self;
    },
    setPayoutAccount(value) {
      self.payout_account = value;
      return self;
    },
    setStripeBalance(value) {
      self.stripe_balance = value;
      return self;
    }
  }));
