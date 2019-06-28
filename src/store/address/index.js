/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

const AddressStore = types
  .model("AddressStore", {
    id: types.number,
    name: types.string,
    street: types.string,
    city: types.string,
    state: types.string,
    zip: types.string,
    apartmentNumber: types.string,
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
      self.zip = value;
      return self;
    },
    setApartmentNumber(value) {
      self.apartmentNumber = value;
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
