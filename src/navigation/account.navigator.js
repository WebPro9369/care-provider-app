import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";
import SettingsScreen from "../screens/account/settings";
import EditNameScreen from "../screens/account/edit-name";
import EditEmailScreen from "../screens/account/edit-email";
import EditAddressScreen from "../screens/account/edit-address";
import EditPhoneNumberScreen from "../screens/account/edit-phonenumber";
import EditSpecialtiesScreen from "../screens/account/edit-specialties";
import PayoutsScreen from "../screens/account/payouts";
import EditBankScreen from "../screens/account/edit-bank";
import UpdateApplicationScreen from "../screens/account/update-application";
import ForgotPwdScreen from "../screens/auth/forgotPwd";
import NewPwdScreen from "../screens/auth/enterNewPwd";

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
    },
    AccountEditSpecialties: {
      screen: EditSpecialtiesScreen
    },
    AccountPayouts: {
      screen: PayoutsScreen
    },
    AccountEditBank: {
      screen: EditBankScreen
    },
    AccountUpdateApplication: {
      screen: UpdateApplicationScreen
    },
    AccountForgotPwd: {
      screen: ForgotPwdScreen
    },
    AccountNewPwd: {
      screen: NewPwdScreen
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
