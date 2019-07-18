/* eslint-disable import/no-unresolved */
import React from "react";
import { Alert } from "react-native";
import { DeeplinkHandler } from "@components/deeplink-handler";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormInputWrapper, FormWrapper } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { updatePassword } from "../../../services/opear-api";
import { colors } from "../../../utils/constants";

class NewPwdScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: null,
      password: null
    };
  }

  onSubmit = () => {
    const { confirm, password } = this.state;
    const { navigation } = this.props;
    const routeInfo = navigation.getParam("routeInfo", 0);

    if (!confirm || !password) {
      return Alert.alert("New Password", "Please input new password.");
    }

    if (confirm && password && confirm !== password) {
      return Alert.alert("Password Error", "Passwords do not match.");
    }
    const id = routeInfo.substring(
      routeInfo.lastIndexOf("reset_token=") + 12,
      routeInfo.lastIndexOf("/email")
    );
    const email = routeInfo.substring(routeInfo.lastIndexOf("email=") + 6);

    // console.tron.log("Token: ", id, email);
    const data = {
      id,
      email,
      password
    };

    const successHandler = () => {
      navigation.navigate("AccountSignIn");
    };

    const errorHandler = () => {
      Alert.alert(
        "Error",
        "Failed to update your password. Please check if your token is expired."
      );
    };

    updatePassword(data, { successHandler, errorHandler });
    return true;
  };

  onPressForgotPassword = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("AccountForgotPwd");
    return true;
  };

  handleConfirmChange = text => {
    this.setState({
      confirm: text
    });
  };

  handlePwdChange = text => {
    this.setState({
      password: text
    });
  };

  render() {
    const { navigation } = this.props;
    const { confirm, password } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ backgroundColor: colors.LIGHTGREEN, height: "100%" }}
      >
        <DeeplinkHandler navigation={navigation} />
        <NavHeader
          title="Enter New Password"
          size="medium"
          hasBackButton={false}
          serviceTextStyle={{ color: "#ffffff" }}
        />
        <FormWrapper centered padding={0}>
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Password"
              value={password}
              placeholder="Enter password"
              type="password"
              color="#ffffff"
              onChangeText={this.handlePwdChange}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Confirm Password"
              value={confirm}
              placeholder="Confirm Password"
              type="password"
              color="#ffffff"
              onChangeText={this.handleConfirmChange}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingBottom={6} style={{ marginBottom: 0 }}>
            <ServiceButton
              title="Update Password"
              onPress={this.onSubmit}
              backgroundColor="#ffffff"
              color={colors.LIGHTGREEN}
            />
          </FormInputWrapper>
          {/* <FormInputWrapper paddingTop={6}>
            <StyledText
              textAlign="center"
              style={{
                color: "#ffffff"
                // borderBottomWidth: 1,
                // borderBottomColor: "#ffffff"
              }}
              onPress={this.onPressForgotPassword}
            >
              forgot password?
            </StyledText>
          </FormInputWrapper> */}
        </FormWrapper>
      </KeyboardAvoidingView>
    );
  }
}

export default NewPwdScreen;
