import { createStackNavigator } from "react-navigation";
import AskLocationScreen from "../screens/onboarding/ask-location";
import NameCaptureScreen from "../screens/onboarding/name-capture";
import EmailCaptureScreen from "../screens/onboarding/email-capture";
import CreatePasswordScreen from "../screens/onboarding/create-password";
import PhoneNumberScreen from "../screens/onboarding/phone-number";
import ApplicationScreen from "../screens/onboarding/application";

const OnboardingNavigator = createStackNavigator(
  {
    AskLocation: {
      screen: AskLocationScreen
    },
    NameCapture: {
      screen: NameCaptureScreen
    },
    EmailCapture: {
      screen: EmailCaptureScreen
    },
    CreatePassword: {
      screen: CreatePasswordScreen
    },
    PhoneNumber: {
      screen: PhoneNumberScreen
    },
    Application: {
      screen: ApplicationScreen
    }
  },
  {
    initialRouteName: "AskLocation",
    headerMode: "none",
    defaultNavigationOptions: {
      headerBackTitle: null,
      gesturesEnabled: false
    }
  }
);

export default OnboardingNavigator;
