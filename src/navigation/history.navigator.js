import { createStackNavigator } from "react-navigation";
import HistoryScreen from "../screens/history";
import VisitDetailsScreen from "../screens/history/visit-details";
import VisitInProgressScreen from "../screens/history/visit-in-progress";

const HistoryNavigator = createStackNavigator(
  {
    HistoryDefault: {
      screen: HistoryScreen
    },
    HistoryVisitDetails: {
      screen: VisitDetailsScreen
    },
    HistoryVisitInProgress: {
      screen: VisitInProgressScreen
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
