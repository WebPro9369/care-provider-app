/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

// Disable yellow warning boxes
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
