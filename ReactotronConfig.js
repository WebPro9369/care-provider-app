import Reactotron from "reactotron-react-native";
import { mst } from "reactotron-mst";
import debugConfig from "./config/debug-config";

if (debugConfig.useReactotron) {
  Reactotron.configure({ host: "localhost" })
    .useReactNative()
    .use(mst())
    .connect();

  console.tron = Reactotron;
}
