/**
 * @format
 */

import { AppRegistry } from "react-native";
import PushNotification from "react-native-push-notification";
import App from "./App";
import { name as appName } from "./app.json";
import { TwilioService } from "./src/services";

// Disable yellow warning boxes
console.disableYellowBox = true;

PushNotification.configure({
  onRegister({ token }) {
    if (console.tron) {
      console.tron.log("Push notification device token: ", token);
    }
    TwilioService.bindDevice(token);
    // TwilioService.getToken();
  },
  onNotification(notification) {
    if (console.tron) console.tron.log("NOTIFICATION:", notification);
  }
});

AppRegistry.registerComponent(appName, () => App);
