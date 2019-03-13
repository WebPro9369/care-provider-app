import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";

const DashboardNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen
    }
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default DashboardNavigator;
