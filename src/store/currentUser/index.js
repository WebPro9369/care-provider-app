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
      govermentIdType: types.string,
      govermentIdCountry: types.string,
      govermentIdNumber: types.string,
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
      titles: types.array(types.string)/*,
      acceptedTermsOfService: types.boolean,
      acceptedPrivacy: types.boolean*/
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
    setGovermentIdType(value) {
      self.govermentIdType = value;
      return self;
    },
    setGovermentIdCountry(value) {
      self.govermentIdCountry = value;
      return self;
    },
    setGovermentIdNumber(value) {
      self.govermentIdNumber = value;
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
    }/*,
    setAcceptedTermsOfService(value) {
      self.acceptedTermsOfService = value;
      return self;
    },
    setAcceptedPrivacy(value) {
      self.acceptedPrivacy = value;
      return self;
    }*/
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
      licenseType: '',
      licenseIssuer: '',
      licenseCountry: '',
      licenseState: '',
      licenseCity: '',
      govermentIdType: '',
      govermentIdCountry: '',
      govermentIdNumber: '',
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
      addresses: [{}]
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
      self.setID(id).setAPIKey(apiKey);
      setAuthentication({ id, apiKey});

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
