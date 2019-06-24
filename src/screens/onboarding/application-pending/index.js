/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { View } from "react-native";
import { inject, observer } from "mobx-react";
import { StyledText } from "@components/text";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { AccentBar } from "@components/accent-bar";

@inject("store")
@observer
class ApplicationPendingScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView padding={0} enabled>
        <View style={{ marginTop: 180, paddingLeft: 30, paddingRight: 30 }}>
          <StyledText
            lineHeight={37}
            fontSize={37}
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            Thanks for applying!
          </StyledText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "auto"
            }}
          />
          <StyledText
            fontSize={21}
            lineHeight={37}
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            We&apos;ll review your application as soon as possible and follow up
            with next steps for onboarding.
            {"\n\n"}
            Please look out for an email from our team shortly.
            {"\n\n"}
            Sincerely,
            {"\n\n"}
            The Opear Team
          </StyledText>
        </View>
        <AccentBar />
      </KeyboardAvoidingView>
    );
  }
}

export default ApplicationPendingScreen;
