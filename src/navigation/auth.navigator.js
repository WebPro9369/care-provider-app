import { createStackNavigator } from "react-navigation";
import SignInScreen from "../screens/auth/signin";
import ForgotPwdScreen from "../screens/auth/forgotPwd";
import NewPwdScreen from "../screens/auth/enterNewPwd";

const AuthNavigator = createStackNavigator(
  {
    AccountSignIn: {
      screen: SignInScreen
    },
    AccountForgotPwd: {
      screen: ForgotPwdScreen
    },
    AccountNewPwd: {
      screen: NewPwdScreen
    }
  },
  {
    initialRouteName: "AccountSignIn",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null
    }
  }
);

export default AuthNavigator;
