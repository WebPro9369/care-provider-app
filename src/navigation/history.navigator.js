import { createStackNavigator } from "react-navigation";
import HistoryScreen from "../screens/history";

const HistoryNavigator = createStackNavigator(
  {
    HistoryDefault: {
      screen: HistoryScreen
    }
  },
  {
    initialRouteName: "HistoryDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default HistoryNavigator;
