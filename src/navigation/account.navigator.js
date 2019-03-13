import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";

const AccountNavigator = createStackNavigator(
  {
    Account: {
      screen: AccountScreen
    }
  },
  {
    initialRouteName: "Account",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default AccountNavigator;
