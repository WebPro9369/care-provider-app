/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { View } from "react-native";
import { inject, observer } from "mobx-react";
import { StyledText } from "@components/text";
import { ScrollView } from "@components/views/scroll-view";
import { AccentBar } from "@components/accent-bar";
import { DeeplinkHandler } from "@components/deeplink-handler";

@inject("store")
@observer
class ApplicationPendingScreen extends Component {
  render() {
    return (
      <ScrollView padding={0}>
        <DeeplinkHandler navigation={this.props.navigation}/>
        <View
          style={{
            marginTop: 180,
            marginBottom: 180,
            paddingLeft: 30,
            paddingRight: 30
          }}
        >
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
      </ScrollView>
    );
  }
}

export default ApplicationPendingScreen;
