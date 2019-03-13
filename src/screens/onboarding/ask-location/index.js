import React, { Component } from "react";
import { Image, View } from "react-native";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";

const imgLocation = require("../../../../assets/images/Location.png");
const imgProgressbar = require("../../../../assets/images/ProgressBar1.png");

class AskLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: null
    };
  }

  handleInputChange = event => {
    this.setState({
      zipcode: event.target.value
    });
  };

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { zipcode } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View>
          <NavHeader title="Welcome to opear" hasBackButton size="small" />
          <StyledText
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            Let&apos;s make sure opear is in your area:
          </StyledText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 16
            }}
          >
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="Zip code"
              value={zipcode}
              onChange={this.handleInputChange}
            />
            <Image source={imgLocation} />
          </View>
        </View>
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Check Availability"
            style={{ marginBottom: 20 }}
            onPress={() => navigate("NameCapture")}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AskLocationScreen;
