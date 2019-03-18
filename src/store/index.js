import { types } from "mobx-state-tree";
import { ApplicationStore } from "./app";
import { ProviderStore } from "./provider";

const MainStore = types.model("MainStore", {
  applicationStore: types.optional(ApplicationStore, {
    SplashShowing: true
  }),
  providerStore: types.optional(ProviderStore, {
    appointment: false,
    readyProviders: false,
    outstandingAppointment: false,
    completeApplication: false
  })
});

export const mainStore = MainStore.create();
