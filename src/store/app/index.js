/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ApplicationStore = types
  .model("ApplicationStore", {
    SplashShowing: types.boolean
  })
  .views(self => ({
    getSplashShowing() {
      return self.SplashShowing;
    }
  }))
  .actions(self => ({
    hideSplash() {
      self.SplashShowing = false;
    }
  }));
