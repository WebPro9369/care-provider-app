import { types } from "mobx-state-tree";
import { ApplicationStore } from "./application";
import { CardStore } from "./card";
import { ProviderStore } from "./provider";
import { CurrentUserStore } from "./currentUser";
import { VisitsStore } from "./visits";

const MainStore = types.model("MainStore", {
  applicationStore: types.optional(ApplicationStore, {
    SplashShowing: true,
    CareProviderSubscriptionsActive: false
  }),
  cardStore: types.optional(CardStore, {
    cardInfo: {
      cardNumber: "",
      expiryYear: 0,
      expiryMonth: 0,
      cvv: "",
      cardType: "",
      fullName: ""
    }
  }),
  providerStore: types.optional(ProviderStore, {
    appointment: false,
    readyProviders: false,
    outstandingAppointment: false,
    completeApplication: false,
    arrived: false,
    active: false
  }),
  currentUserStore: types.optional(CurrentUserStore, {
    id: 0,
    apiKey: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    rating: 0,
    avatar: "",
    acceptedStripeTOS: false,
    notificationToken: ""
  }),
  visitsStore: types.optional(VisitsStore, {
    visits: []
  })
});

export const mainStore = MainStore.create();
