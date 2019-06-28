/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ChildStore = types
  .model("ChildStore", {
    id: types.number,
    age: types.number,
    gender: types.string,
    firstName: types.string,
    lastName: types.string,
    birthDate: types.Date,
    birthHistory: types.optional(types.string, ""),
    surgicalHistory: types.optional(types.string, ""),
    currentMedications: types.optional(types.string, ""),
    hospitalizations: types.optional(types.string, ""),
    currentMedicalConditions: types.optional(types.string, ""),
    allergies: types.array(types.string, "")
  })
  .actions(self => ({
    setGender(value) {
      self.gender = value;
      return self;
    },
    setName(value) {
      self.name = value;
      return self;
    },
    setBirthDate(value) {
      self.birthDate = value;
      return self;
    },
    setBirthHistory(value) {
      self.birthHistory = value;
      return self;
    },
    setSurgicalHistory(value) {
      self.surgicalHistory = value;
      return self;
    },
    setCurrentMedications(value) {
      self.currentMedications = value;
      return self;
    },
    setHospitalizations(value) {
      self.hospitalizations = value;
      return self;
    },
    setCurrentMedicalConditions(value) {
      self.currentMedicalConditions = value;
      return self;
    },
    setAllergies(value) {
      self.allergies.replace(value);
      return self;
    }
  }));

export default ChildStore;
