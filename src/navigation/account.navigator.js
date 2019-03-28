import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";
import SettingsScreen from "../screens/account/settings";
import EditNameScreen from "../screens/account/edit-name";
import EditEmailScreen from "../screens/account/edit-email";
import EditAddressScreen from "../screens/account/edit-address";
import EditPhoneNumberScreen from "../screens/account/edit-phonenumber";

const AccountNavigator = createStackNavigator(
  {
    AccountDefault: {
      screen: AccountScreen
    },
    AccountSettings: {
      screen: SettingsScreen
    },
    AccountEditName: {
      screen: EditNameScreen
    },
    AccountEditEmail: {
      screen: EditEmailScreen
    },
    AccountEditAddress: {
      screen: EditAddressScreen
    },
    AccountEditPhoneNumber: {
      screen: EditPhoneNumberScreen
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
