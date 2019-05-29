/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export default AddressStore = types
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