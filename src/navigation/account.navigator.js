import { createStackNavigator } from "react-navigation";
import AccountScreen from "../screens/account";
import SettingsScreen from "../screens/account/settings";
import PaymentScreen from "../screens/account/payment";
import EditAddressScreen from "../screens/account/edit-address";
import EditEmailScreen from "../screens/account/edit-email";
import EditPhoneNumberScreen from "../screens/account/edit-phonenumber";
import EditCardScreen from "../screens/account/edit-card";
import AddCardScreen from "../screens/account/add-card";
import EditChildScreen from "../screens/account/edit-child";

const SettingsNavigator = createStackNavigator(
  {
    Default: {
      screen: SettingsScreen
    },
    EditAdress: {
      screen: EditAddressScreen
    },
    EditEmail: {
      screen: EditEmailScreen
    },
    EditPhoneNumber: {
      screen: EditPhoneNumberScreen
    },
    EditChild: {
      screen: EditChildScreen
    }
  },
  {
    initialRouteName: "Default",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

const PaymentNavigator = createStackNavigator(
  {
    Default: {
      screen: PaymentScreen
    },
    EditCard: {
      screen: EditCardScreen
    },
    AddCard: {
      screen: AddCardScreen
    }
  },
  {
    initialRouteName: "Default",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

const AccountNavigator = createStackNavigator(
  {
    Account: {
      screen: AccountScreen
    },
    Settings: {
      screen: SettingsNavigator
    },
    Payment: {
      screen: PaymentNavigator
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
