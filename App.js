/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React from "react";
import PushNotification from "react-native-push-notification";
import { Provider, observer } from "mobx-react";
import { Sentry } from "react-native-sentry";
import { TwilioService } from "./src/services";
import { mainStore } from "./src/store";
import RootContainer from "./src/root-container";

Sentry.config(
  "https://cf2675d7f0cf4c97996e262a36d9bf34@sentry.io/1220229"
).install();

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
        console.tron &&
          console.tron.log("Push notification device token: ", token);

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

  // eslint-disable-next-line class-methods-use-this
  onStartAsync() {
    setTimeout(() => {
      mainStore.applicationStore.hideSplash();
    }, 5000);
  }

  render() {
    return (
      <Provider store={mainStore}>
        <RootContainer />
      </Provider>
    );
  }
}
