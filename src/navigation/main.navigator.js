import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../screens/authLoading";
import TabNavigator from "./tab.navigator";
import OnboardingNavigator from "./onboarding.navigator";
import AuthNavigator from "./auth.navigator";
import ApplicationPendingScreen from "../screens/onboarding/application-pending";

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
    },
    ApplicationPending: {
      screen: ApplicationPendingScreen
    }
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppNavigationContainer = createAppContainer(MainNavigator);

export default AppNavigationContainer;
