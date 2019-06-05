import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../screens/authLoading";
import SignInScreen from "../screens/auth/signin";
import TabNavigator from "./tab.navigator";
import OnboardingNavigator from "./onboarding.navigator";

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    AccountSignIn: {
      screen: SignInScreen
    },
    Tabs: {
      screen: TabNavigator
    },
    Onboarding: {
      screen: OnboardingNavigator
    }
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppNavigationContainer = createAppContainer(MainNavigator);

export default AppNavigationContainer;
