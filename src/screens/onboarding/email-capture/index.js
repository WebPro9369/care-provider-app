import React, { Component } from "react";
import { Image, View } from "react-native";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

const imgProgressbar = require("../../../../assets/images/ProgressBar3.png");

class EmailCaptureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  handleInputChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  render() {
    const {
      navigation: { navigate, goBack }
    } = this.props;
    const { email } = this.state;
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
            What is your e-mail?
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="Email"
              textContentType="emailAddress"
              value={email}
              onChange={this.handleInputChange}
            />
          </View>
        </View>
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Next"
            style={{ marginBottom: 20 }}
            onPress={() => navigate("CreatePassword")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EmailCaptureScreen;
