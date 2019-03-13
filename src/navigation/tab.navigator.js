import React from "react";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "react-navigation";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigator from "./account.navigator";
import DashboardNavigator from "./dashboard.navigator";
import AvailabilityScreen from "../screens/availability";
import HistoryNavigator from "./history.navigator";
import { colors } from "../utils/constants";

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator,
      navigationOptions: () => ({
        title: "Dashboard",
        tabBarLabel: "Dashboard"
      })
    },
    Availability: {
      screen: AvailabilityScreen,
      navigationOptions: () => ({
        title: "Availability",
        tabBarLabel: "Availability"
      })
    },
    History: {
      screen: HistoryNavigator,
      navigationOptions: () => ({
        title: "History",
        tabBarLabel: "History"
      })
    },
    Account: {
      screen: AccountNavigator,
      navigationOptions: () => ({
        title: "Account",
        tabBarLabel: "Account"
      })
    }
  },
  {
    initialRouteName: "Dashboard",
    defaultNavigationOptions: ({ navigation }) => {
      const TabBarIcon = ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = MaterialCommunityIcons;
        let iconName;
        switch (routeName) {
          case "Dashboard":
            iconName = "home";
            break;
          case "Availability":
            IconComponent = Ionicons;
            iconName = "ios-briefcase";
            break;
          case "History":
            iconName = "history";
            break;
          case "Account":
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
