import React, { Component } from "react";
import { Image, View, Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";

const imgProgressbar = require("../../../../assets/images/ProgressBar2.png");

@inject("store")
@observer
class NameCaptureScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }

  handleInputChange = text => {
    this.setState({
      name: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;
    const { name } = this.state;
    if (!name) {
      return Alert.alert("Please input your full name.");
    }
    const names = name.split(" ");
    currentUserStore.setFirstName(names[0]);
    if (names.length > 1) {
      currentUserStore.setLastName(names[1]);
    }
    return navigate("EmailCapture");
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { name } = this.state;

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
            What is your full name?
          </StyledText>
          <View>
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="Full name"
              value={name}
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
    );
  }
}

export default NameCaptureScreen;
