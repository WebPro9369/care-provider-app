import React, { Component } from "react";
import { Image, View, Alert, NativeModules } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import axios from "axios";
import TouchID from "react-native-touch-id";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { AccentBar } from "@components/accent-bar"

@inject("store")
@observer

class ApplicationPendingScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" padding={0} enabled>
        <View style={{ marginTop: 180, paddingLeft:20, paddingRight:20 }}>
          <StyledText
            lineHeight={37}
            fontSize={37}
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24}}
          >
            Thanks for applying!
          </StyledText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 16
            }}
          >
          </View>
          <StyledText
            fontSize={24}
            lineHeight={37}
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            We'll review your application as soon as possible and follow up with next steps for onboarding.
            {"\n"}{"\n"}
            Please look out for an email from our team shortly.
            {"\n"}{"\n"}
            Sincerely,
            {"\n"}{"\n"}
            The Opear Team
          </StyledText>

        </View>
        <AccentBar />
      </KeyboardAvoidingView>
    );
  }
}

export default ApplicationPendingScreen;