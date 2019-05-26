import React from "react";
import { createStackNavigator } from "react-navigation";
import VisitsScreen from "../screens/visits";
import VisitDetailsScreen from "../screens/visits/visit-details";
import VisitInProgressScreen from "../screens/visits/visit-in-progress";

const VisitsNavigator = createStackNavigator(
  {
    VisitsDefault: {
      screen: VisitsScreen
    },
    VisitsVisitDetails: {
      screen: VisitDetailsScreen
    },
    VisitsPastVisitDetails: {
      screen: props => <VisitDetailsScreen {...props} past />
    },
    VisitsVisitInProgress: {
      screen: VisitInProgressScreen
    }
  },
  {
    initialRouteName: "VisitsDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default VisitsNavigator;
