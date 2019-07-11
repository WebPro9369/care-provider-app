import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";
import SettingsScreen from "../screens/account/settings";
import EditNameScreen from "../screens/account/edit-name";
import EditEmailScreen from "../screens/account/edit-email";
import EditAddressScreen from "../screens/account/edit-address";
import EditPhoneNumberScreen from "../screens/account/edit-phonenumber";
import EditBioScreen from "../screens/account/edit-bio";
import EditSpecialtiesScreen from "../screens/account/edit-specialties";
import PayoutsScreen from "../screens/account/payouts";
import EditBankScreen from "../screens/account/edit-bank";
import AddCardScreen from "../screens/account/add-card";
import ScanCardScreen from "../screens/account/scan-card";

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
    AccountEditBio: {
      screen: EditBioScreen
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
    AccountAddCard: {
      screen: AddCardScreen
    },
    AccountScanCard: {
      screen: ScanCardScreen
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
