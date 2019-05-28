import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import TwilioService from "../../../services/twilio";

const imgProgressbar = require("../../../../assets/images/ProgressBar5.png");

class PhoneNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null
    };
  }

  handleInputChange = text => {
    this.setState({
      phone: text
    });
  };

  onSubmit = () => {
    const { phone } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    console.tron.log("Phone number: ", phone);
    TwilioService.sendSMS(
      "Test SMS from Twilio",
      null,
      phone,
      () => navigate("Application"),
      () => Alert.alert("Authentication failed.")
    );
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { phone } = this.state;

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
            What is your phone number?
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="(123) 456 - 7890"
              value={phone}
              onChangeText={this.handleInputChange}
            />
          </View>
        </View>
        <View>
          <Image
            source={imgProgressbar}
            resizeMode="contain"
            style={{ width: "100%", marginBottom: 16 }}
          />
          <ServiceButton
            title="Authenticate"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default PhoneNumberScreen;
