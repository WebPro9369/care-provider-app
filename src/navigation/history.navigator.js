import { createStackNavigator } from "react-navigation";
import HistoryScreen from "../screens/history";

const HistoryNavigator = createStackNavigator(
  {
    History: {
      screen: HistoryScreen
    }
  },
  {
    initialRouteName: "History",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default HistoryNavigator;
