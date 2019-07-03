/* eslint-disable no-return-assign */
import React from "react";
import PropTypes from "prop-types";
import { View, Linking } from "react-native";

class DeeplinkHandler extends React.Component {
  constructor(props) {
    super(props);
    console.tron.log(props);
  }

  componentDidMount() {
    Linking.addEventListener("url", this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = url => {
    this.navigate(url);
  };

  navigate = url => {
    console.tron.log(url);
    const {
      navigation: { navigate }
    } = this.props;
    const route = url.url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];

    if (routeName === "newpwd") {
      navigate("AccountNewPwd", { routeInfo: route });
    } else if ( routeName === "visitRequest") {
      navigate("DashboardDefault", { routeInfo: route });
    } else if ( routeName === "upcomingVisit") {
      navigate("VisitsVisitDetails", { routeInfo: route });
    }
  };

  render() {


    return (
      null
    );
  }
};

export { DeeplinkHandler };
