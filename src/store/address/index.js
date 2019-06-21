/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

const AddressStore = types
  .model("AddressStore", {
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
      return self;
    },
    setStreet(value) {
      self.street = value;
      return self;
    },
    setCity(value) {
      self.city = value;
      return self;
    },
    setState(value) {
      self.state = value;
      return self;
    },
    setZipCode(value) {
      self.zip_code = value;
      return self;
    },
    setApartmentNumber(value) {
      self.apartment_number = value;
      return self;
    },
    setLatitude(value) {
      self.latitude = value;
      return self;
    },
    setLongitude(value) {
      self.longitude = value;
      return self;
    }
  }));

export default AddressStore;
