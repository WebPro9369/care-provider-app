/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const OnboardingAddress = types
  .model("OnboardingAddress", {
    name: types.string,
    street: types.string,
    city: types.string,
    state: types.string,
    zip_code: types.string,
    apartment_number: types.string,
    latitude: types.string,
    longitude: types.string
  })
  .actions(self => ({
    setName(value) {
      self.name = value;
    },
    setStreet(value) {
      self.street = value;
    },
    setCity(value) {
      self.city = value;
    },
    setState(value) {
      self.state = value;
    },
    setZipCode(value) {
      self.zip_code = value;
    },
    setApartmentNumber(value) {
      self.apartment_number = value;
    },
    setLatitude(value) {
      self.latitude = value;
    },
    setLongitude(value) {
      self.longitude = value;
    }
  }));

export const OnboardingData = types
  .model("OnboardingData", {
    email: types.string,
    first_name: types.string,
    last_name: types.string,
    date_of_birth: types.string,
    password: types.string,
    // facebook_uid: types.string,
    address: types.optional(OnboardingAddress, {
      name: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      apartment_number: "",
      latitude: "",
      longitude: ""
    }),
    bankToken: types.string
  })
  .actions(self => ({
    setEmail(value) {
      self.email = value;
    },
    setFirstName(value) {
      self.first_name = value;
    },
    setLastName(value) {
      self.last_name = value;
    },
    setDOB(value) {
      self.date_of_birth = value;
    },
    setPassword(value) {
      self.password = value;
    },
    setFBUid(value) {
      self.facebook_uid = value;
    },
    setBankToken(token) {
      self.bankToken = token;
    }
  }));
