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
        parent_id: types.number,
        child_id: types.number,
        address_id: types.number,
        care_provider_id: types.number,
        reason: types.string,
        symptoms: types.array(types.string),
        appointment_time: types.string,
        parent_notes: types.string,
        visit_notes: types.maybeNull(types.string),
        payment_amount: types.string,
        state: types.string,
        child: types.optional(ChildStore, {
          id: -1,
          gender: "",
          avatar_image_index: types.number,
          first_name: "",
          last_name: "",
          dob: "01/01/1900",
          surgical_history: "",
          current_medications: "",
          birth_history: "",
          hospitalizations: "",
          current_medical_conditions: "",
          allergies: ""
        }),
        address: types.optional(AddressStore, {
          id: -1,
          name: "",
          street: "",
          city: "",
          state: "",
          zip: ""
        }),
        parent: types.optional(ParentStore, {
          id: -1,
          name: "",
          email: "",
          phone: "",
          zip: "",
          accepted_privacy: false,
          accepted_terms_of_service: false,
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
