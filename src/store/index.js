import { types } from "mobx-state-tree";
import { ApplicationStore } from "./application";
import { ProviderStore } from "./provider";
import { CurrentUserStore } from './currentUser';

const MainStore = types.model("MainStore", {
  applicationStore: types.optional(ApplicationStore, {
    SplashShowing: true
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
		apiKey: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  }),
});

export const mainStore = MainStore.create();
