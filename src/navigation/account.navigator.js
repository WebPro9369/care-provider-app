import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";

const AccountNavigator = createStackNavigator(
  {
    AccountDefault: {
      screen: AccountScreen
    }
  },
  {
    initialRouteName: "AccountDefault",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default AccountNavigator;
