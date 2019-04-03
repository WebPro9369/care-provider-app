import React from "react";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AccountNavigator from "./account.navigator";
import DashboardNavigator from "./dashboard.navigator";
import AvailabilityNavigator from "./availability.navigator";
import HistoryNavigator from "./history.navigator";
import { colors } from "../utils/constants";

const TabNavigator = createBottomTabNavigator(
  {
    TabDashboard: {
      screen: DashboardNavigator,
      navigationOptions: () => ({
        title: "Dashboard",
        tabBarLabel: "Dashboard"
      })
    },
    TabAvailability: {
      screen: AvailabilityNavigator,
      navigationOptions: () => ({
        title: "Availability",
        tabBarLabel: "Availability"
      })
    },
    TabHistory: {
      screen: HistoryNavigator,
      navigationOptions: () => ({
        title: "History",
        tabBarLabel: "History"
      })
    },
    TabAccount: {
      screen: AccountNavigator,
      navigationOptions: () => ({
        title: "Account",
        tabBarLabel: "Account"
      })
    }
  },
  {
    initialRouteName: "TabDashboard",
    defaultNavigationOptions: ({ navigation }) => {
      const TabBarIcon = ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        switch (routeName) {
          case "TabDashboard":
            iconName = "home";
            break;
          case "TabAvailability":
            IconComponent = Ionicons;
            iconName = "ios-briefcase";
            break;
          case "TabHistory":
            iconName = "history";
            break;
          case "TabAccount":
            iconName = "account";
            break;
          default:
            break;
        }
        IconComponent.propTypes = {
          tintColor: PropTypes.string
        };
        return <IconComponent name={iconName} size={24} color={tintColor} />;
      };
      TabBarIcon.propTypes = {
        tintColor: PropTypes.string.isRequired
      };
      return {
        tabBarIcon: TabBarIcon
      };
    },
    tabBarOptions: {
      activeTintColor: colors.DARKSKYBLUE,
      inactiveTintColor: colors.MIDGREY
    }
  }
);

export default TabNavigator;
