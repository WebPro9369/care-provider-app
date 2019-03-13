import { observable, action } from "mobx";
import { create, persist } from "mobx-persist";
import { AsyncStorage } from "react-native";

class ProviderState {
  @persist("object") @observable providerData = {
    appointment: null,
    readyProviders: null,
    outstandingAppointment: null,
    completeApplication: false
  };

  @action setAppointment(value) {
    this.providerData.appointment = value;
  }

  @action setReadyProviders(value) {
    this.providerData.readyProviders = value;
  }

  @action setOutstandingAppointment(value) {
    this.providerData.outstandingAppointment = value;
  }

  @action setCompleteApplication(value) {
    this.providerData.completeApplication = value;
  }
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

const providerSingleton = new ProviderState();
export default providerSingleton;

hydrate("providerData", providerSingleton, {
  providerData: {
    appointment: null,
    readyProviders: null,
    outstandingAppointment: null,
    completeApplication: false
  }
}).then(() => {
  // eslint-disable-next-line no-console
  console.log("Hydrated: providerData");
});
