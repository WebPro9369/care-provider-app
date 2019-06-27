import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../screens/authLoading";
import TabNavigator from "./tab.navigator";
import OnboardingNavigator from "./onboarding.navigator";
import AuthNavigator from "./auth.navigator";

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    Authenticating: {
      screen: AuthNavigator
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
