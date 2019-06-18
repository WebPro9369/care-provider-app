import React, { Component } from "react";
import { Alert, Image, View, SafeAreaView } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

const imgProgressbar = require("../../../../assets/images/ProgressBar3.png");

@inject("store")
@observer
class EmailCaptureScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null
    };
  }

  handleInputChange = text => {
    this.setState({
      email: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;
    const { email } = this.state;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !regEmail.test(email)) {
      return Alert.alert("Please enter a valid email address.");
    }
    currentUserStore.setEmail(email);
    return navigate("CreatePassword");
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { email } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView enabled>
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
              title="Next"
              style={{ marginBottom: 20 }}
              onPress={this.onSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default EmailCaptureScreen;
