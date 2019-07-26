/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import { setAuthentication } from "@services/authentication";
import AddressStore from "../address";

const ApplicationStore = types
  .model("ApplicationStore", {
    dateOfBirth: types.string,
    biography: types.string,
    licenseNumber: types.string,
    licenseType: types.string,
    licenseIssuer: types.string,
    licenseCountry: types.string,
    licenseState: types.string,
    licenseCity: types.string,
    governmentIdType: types.string,
    governmentIdCountry: types.string,
    governmentIdNumber: types.string,
    boardCertification: types.string,
    malpracticeInsurance: types.string,
    educationHistory: types.array(types.string),
    workHistory: types.array(types.string),
    specialties: types.array(types.string),
    offeredServices: types.array(types.string),
    whereHeard: types.string,
    supervisingPhysician: types.string,
    acceptedPrivacy: types.boolean,
    acceptedTermsOfService: types.boolean,
    titles: types.array(types.string)
  })
  .actions(self => ({
    setDateOfBirth(value) {
      self.dateOfBirth = value;
      return self;
    },
    setBoardCertification(value) {
      self.boardCertification = value;
      return self;
    },
    setBiography(value) {
      self.biography = value;
      return self;
    },
    setSSNLast4(value) {
      self.ssnLast4 = value;
      return self;
    },
    setLicenseNumber(value) {
      self.licenseNumber = value;
      return self;
    },
    setLicenseType(value) {
      self.licenseType = value;
      return self;
    },
    setLicenseIssuer(value) {
      self.licenseIssuer = value;
      return self;
    },
    setLicenseCountry(value) {
      self.licenseCountry = value;
      return self;
    },
    setLicenseState(value) {
      self.licenseState = value;
      return self;
    },
    setLicenseCity(value) {
      self.licenseCity = value;
      return self;
    },
    setGovernmentIdType(value) {
      self.governmentIdType = value;
      return self;
    },
    setGovernmentIdCountry(value) {
      self.governmentIdCountry = value;
      return self;
    },
    setGovernmentIdNumber(value) {
      self.governmentIdNumber = value;
      return self;
    },
    setMalpracticeInsurance(value) {
      self.malpracticeInsurance = value;
      return self;
    },
    setEducationHistory(value) {
      self.educationHistory.replace(value);
      return self;
    },
    setWorkHistory(value) {
      self.workHistory.replace(value);
      return self;
    },
    setSpecialties(value) {
      self.specialties.replace(value);
      return self;
    },
    setOfferedServices(value) {
      self.offeredServices.replace(value);
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
      self.titles.replace(value);
      return self;
    },
    setAcceptedPrivacy(value) {
      self.acceptedPrivacy = value;
      return self;
    },
    setAcceptedTermsOfService(value) {
      self.acceptedTermsOfService = value;
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
    password: types.optional(types.string, ""),
    email: types.string,
    firstName: types.string,
    lastName: types.string,
    phone: types.string,
    acceptedStripeTOS: types.boolean,
    notificationToken: types.string,
    avatar: types.string,
    smsNotification: types.boolean,
    application: types.optional(ApplicationStore, {
      dateOfBirth: "",
      biography: "",
      ssnLast4: "",
      licenseNumber: "",
      licenseType: "",
      licenseIssuer: "",
      licenseCountry: "",
      licenseState: "",
      licenseCity: "",
      governmentIdType: "",
      governmentIdCountry: "",
      governmentIdNumber: "",
      boardCertification: "",
      malpracticeInsurance: "",
      educationHistory: [],
      workHistory: [],
      specialties: [],
      offeredServices: [],
      whereHeard: "",
      supervisingPhysician: "",
      titles: [],
      addresses: [{}],
      acceptedTermsOfService: false,
      acceptedPrivacy: false
    }),
    address: types.optional(AddressStore, {
      id: -1,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      apartmentNumber: "",
      latitude: "",
      longitude: ""
    }),
    payout_account: types.maybeNull(PayoutAccountStore),
    stripe_balance: types.maybeNull(types.number),
    rating: types.number
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
    setAuthentication({ id, apiKey }) {
      self.setID(id).setAPIKey(apiKey);
      setAuthentication({ id, apiKey });

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
    setAcceptedStripeTOS(value) {
      self.acceptedStripeTOS = value;
      return self;
    },
    setPayoutAccount(value) {
      if(self.payout_account) {
        self.payout_account.setTokenId(value.token_id);
        self.payout_account.setLast4(value.last4);
      } else {
        self.payout_account = value;
      }
      return self;
    },
    setStripeBalance(value) {
      self.stripe_balance = value;
      return self;
    },
    setRating(value) {
      self.rating = value;
      return self;
    },
    reset() {
      self.id = 0;
      self.apiKey = "";
      self.email = "";
      self.firstName = "";
      self.lastName = "";
      self.phone = "";
      self.rating = 0;
      self.acceptedStripeTOS = false;
    },
    setNotificationToken(value) {
      self.notificationToken = value;
      return self;
    },
    setAvatar(value) {
      self.avatar = value;
      return self;
    },
    setSmsNotification(value) {
      self.smsNotification = value;
      return self;
    }
  }));
