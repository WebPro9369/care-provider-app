import { createStackNavigator } from "react-navigation";
import DashboardScreen from "../screens/dashboard";
import ApplicationScreen from "../screens/onboarding/application";
import VisitDetailsScreen from "../screens/visits/visit-details";

const DashboardNavigator = createStackNavigator(
  {
    DashboardDefault: {
      screen: DashboardScreen
    },
    DashboardApplication: {
      screen: ApplicationScreen
    },
    DashboardVisitDetails: {
      screen: VisitDetailsScreen
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
