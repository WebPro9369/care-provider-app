import React from "react";
import PushNotification from "react-native-push-notification";
import { AppState } from "react-native";
import { Provider, observer } from "mobx-react";
import { TwilioService } from "./src/services";
import { mainStore } from "./src/store";
import RootContainer from "./src/root-container";

import { Sentry } from 'react-native-sentry';

Sentry.config('https://cf2675d7f0cf4c97996e262a36d9bf34@sentry.io/1220229').install();


@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-undef
    import("./ReactotronConfig").then(() =>
      // eslint-disable-next-line no-console
      console.log("Reactotron Configured")
    );

    
    PushNotification.configure({
      onRegister({ token }) {
        console.tron && console.tron.log("Push notification device token: ", token);

        const { currentUserStore } = mainStore;
        currentUserStore.setNotificationToken(token);
        TwilioService.bindDevice(token);
      },
      onNotification(notification) {
        console.tron && console.tron.log("NOTIFICATION:", notification);
      }
    });
  }

  componentWillMount() {}

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillReceiveProps() {}

  componentWillUpdate() {}

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  // eslint-disable-next-line class-methods-use-this
  onStartAsync() {
    setTimeout(() => {
      mainStore.applicationStore.hideSplash();
    }, 5000);
  }

  // eslint-disable-next-line class-methods-use-this
  handleAppStateChange(appState) {
    if (appState === "background") {
      console.tron.log("Appstate changed: ", appState);
      // let date = new Date(Date.now() + 10 * 1000);

      TwilioService.sendNotification(
        "Test Notification",
        "This is a notification from Twilio!!!",
        null,
        "reo"
      );

      TwilioService.sendSMS("SMS Boby", null, "+19085008863");
      TwilioService.makeCall(null, null, "+19085008863");
    }
  }

  render() {
    return (
      <Provider store={mainStore}>
        <RootContainer />
      </Provider>
    );
  }
}
