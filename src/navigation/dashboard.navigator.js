import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";
import ApplicationScreen from "../screens/onboarding/application";

const DashboardNavigator = createStackNavigator(
  {
    DashboardDefault: {
      screen: DashboardScreen
    },
    DashboardApplication: {
      screen: ApplicationScreen
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
