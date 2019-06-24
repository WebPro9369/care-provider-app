import Reactotron from "reactotron-react-native";
import { mst } from "reactotron-mst";
import { mainStore } from "./src/store";

if (__DEV__) {
  Reactotron.configure({ host: "192.168.3.211" })
  // Reactotron.configure({ host: "localhost" })
    .useReactNative()
    .use(mst())
    .connect();

  console.tron = Reactotron;
  console.tron.trackMstNode(mainStore);
} else {
  console.tron = {
    log: () => {}
  };
}
