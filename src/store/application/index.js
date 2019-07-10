/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ApplicationStore = types
  .model("ApplicationStore", {
    SplashShowing: types.boolean,
    CareProviderSubscriptionsActive: types.boolean
  })
  .views(self => ({
    getSplashShowing() {
      return self.SplashShowing;
    }
  }))
  .actions(self => ({
    hideSplash() {
      self.SplashShowing = false;
      return self;
    },
    setSubscriptionsActive(value) {
      self.CareProviderSubscriptionsActive = value;
      return self;
    }
  }));
