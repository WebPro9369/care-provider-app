import { createStackNavigator } from "react-navigation";
import AvailabilityScreen from "../screens/availability";

const AvailabilityNavigator = createStackNavigator(
  {
    AvailabilityDefault: {
      screen: AvailabilityScreen
    }
  },
  {
    initialRouteName: "AvailabilityDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default AvailabilityNavigator;
