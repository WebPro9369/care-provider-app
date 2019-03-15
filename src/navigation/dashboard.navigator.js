import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";

const DashboardNavigator = createStackNavigator(
  {
    DashboardDefault: {
      screen: DashboardScreen
    }
  },
  {
    initialRouteName: "DashboardDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default DashboardNavigator;
