import React from "react";
// import { Alert, View } from "react-native";
// import { inject, observer } from "mobx-react";
// import axios from "axios";
import { FormTextInput, StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormInputWrapper, FormWrapper } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
  }

  onSubmit = () => {
    return true;
  };

  onPressForgotPassword = () => {
    const {
      navigation: { navigate }
    } = this.props;
    navigate("AccountForgotPwd");
    return true;
  };

  handleEmailChange = text => {
    this.setState({
      email: text
    });
  };

  handlePwdChange = text => {
    this.setState({
      password: text
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{ backgroundColor: colors.LIGHTGREEN, height: "100%" }}
      >
        <NavHeader
          title="Sign In"
          size="medium"
          hasBackButton={false}
          serviceTextStyle={{ color: "#ffffff" }}
        />
        <FormWrapper centered padding={0} style={{ marginTop: 32 }}>
          <FormInputWrapper paddingLeft={16} paddingRight={16}>
            <FormTextInput
              label="Email"
              value={email}
              placeholder="name@domain.com"
              color="#ffffff"
              onChangeText={this.handleEmailChange}
            />
          </FormInputWrapper>
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
          <FormInputWrapper paddingBottom={6} style={{ marginBottom: 0 }}>
            <ServiceButton
              title="Sign In"
              onPress={this.onSubmit}
              backgroundColor="#ffffff"
              color={colors.LIGHTGREEN}
            />
          </FormInputWrapper>
          <FormInputWrapper paddingTop={6}>
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
          </FormInputWrapper>
        </FormWrapper>
      </KeyboardAvoidingView>
    );
  }
}

export default SignInScreen;
