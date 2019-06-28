/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";
import ChildStore from "../child";
import AddressStore from "../address";
import ParentStore from "../parent";

export const VisitsStore = types
  .model("VisitsStore", {
    visits: types.array(
      types.model({
        id: types.number,
        parentId: types.number,
        childId: types.number,
        addressId: types.number,
        careProviderId: types.number,
        // avatarImg: types.string,
        reason: types.string,
        symptoms: types.array(types.string),
        appointmentTime: types.Date,
        parentNotes: types.string,
        visitNotes: types.string,
        paymentAmount: types.string,
        state: types.string,
        child: types.optional(ChildStore, {
          id: -1,
          age: -1,
          gender: "",
          firstName: "",
          lastName: "",
          birthDate: new Date("01/01/1900"),
          birthHistory: "",
          surgicalHistory: "",
          currentMedications: "",
          hospitalizations: "",
          currentMedicalConditions: "",
          allergies: []
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
        parent: types.optional(ParentStore, {
          id: -1,
          name: "",
          email: "",
          phone: "",
          zip: "",
          acceptedPrivacy: false,
          acceptedTermsOfService: false,
          active: false
        })
      })
    )
  })
  .actions(self => ({
    setID(index, value) {
      self.visits[index].id = value;
      return self;
    },
    setChildID(index, value) {
      self.visits[index].childId = value;
      return self;
    },
    setAddressID(index, value) {
      self.visits[index].addressId = value;
      return self;
    },
    setAvatarImg(index, value) {
      self.visits[index].avatarImg = value;
    },
    setReason(index, value) {
      self.visits[index].reason = value;
      return self;
    },
    setSymptoms(index, value) {
      self.visits[index].symptoms.replace(value);
      return self;
    },
    setAppointmentTime(index, value) {
      self.visits[index].appointmentTime = value;
      return self;
    },
    setParentNotes(index, value) {
      self.visits[index].parentNotes = value;
      return self;
    },
    setPaymentAmount(index, value) {
      self.visits[index].paymentAmount = value;
      return self;
    },
    addVisit(visit) {
      let found = false;
      (self.visits || []).forEach(v => {
        if (v.id === visit.id) {
          found = true;
        }
      });

      if (!found) {
        self.visits.push(visit);
      }
      return self;
    },
    replaceVisit(index, visit) {
      self.visits[index] = visit;
      return self;
    },
    removeVisit(index) {
      self.visits.splice(index, 1);
      return self;
    },
    setVisits(visits) {
      self.visits = visits;
      return self;
    },
    setVisitState(index, value) {
      self.visits[index].state = value;
      return self;
    }
  }));

export default VisitsStore;
