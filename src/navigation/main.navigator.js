import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthLoadingScreen from "../screens/authLoading";
import TabNavigator from "./tab.navigator";
import OnboardingNavigator from "./onboarding.navigator";

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen
    },
    Tabs: {
      screen: TabNavigator
    },
    Onboarding: {
      screen: OnboardingNavigator
    }
    // Dashboard: {
    //   screen: DashboardNavigator
    // }
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppNavigationContainer = createAppContainer(MainNavigator);

export default AppNavigationContainer;
