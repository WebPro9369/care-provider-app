/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

const ParentStore = types
  .model("ParentStore", {
    id: types.number,
    name: types.string,
    email: types.string,
    zip: types.string,
    phone: types.string,
    acceptedPrivacy: types.boolean,
    acceptedTermsOfService: types.boolean,
    active: types.boolean
  })
  .actions(self => ({
    setName(value) {
      self.name = value;
      return self;
    },
    setEmail(value) {
      self.email = value;
      return self;
    },
    setZipCode(value) {
      self.zip = value;
      return self;
    },
    setPhone(value) {
      self.phone = value;
      return self;
    },
    setAcceptedPrivacy(value) {
      self.acceptedPrivacy = value;
      return self;
    },
    setAcceptedTOS(value) {
      self.acceptedTermsOfService = value;
      return self;
    },
    setActive(value) {
      self.active = value;
      return self;
    }
  }));

export default ParentStore;
