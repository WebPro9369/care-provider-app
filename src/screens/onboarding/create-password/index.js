import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

const imgProgressbar = require("../../../../assets/images/ProgressBar4.png");

class CreatePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null
    };
  }

  handleInputChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    const {
      navigation: { navigate, goBack }
    } = this.props;
    const { password } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View>
          <NavHeader
            hasBackButton
            size="small"
            onPressBackButton={() => goBack()}
          />
          <StyledText
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            Choose a password
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChange={this.handleInputChange}
            />
          </View>
        </View>
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={() => navigate("PhoneNumber")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CreatePasswordScreen;
