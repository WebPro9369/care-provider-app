import React, { Component } from "react";
import { Alert, Image, View } from "react-native";
import PhoneInput from "react-native-phone-input";
import { inject, observer, PropTypes } from "mobx-react";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { colors } from "../../../utils/constants";

const imgProgressbar = require("../../../../assets/images/ProgressBar5.png");

@inject("store")
@observer
class PhoneNumberScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: null
    };
  }

  handleChange = (phone) => {
    this.setState({ phone });
  };

  onSubmit = () => {
    const { phone} = this.state;
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;

    console.tron.log("Phone number: ", phone);

    if(!this.phone.isValidNumber())
    {
      return Alert.alert("Please enter a valid phone number.");
    }

    currentUserStore.setPhone(phone);

    return navigate("Application");
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
          <View
            style={{
              paddingTop: 16,
              paddingBottom: 16,
              borderBottomColor: colors.BLACK38,
              borderBottomWidth: 1
            }}
          >
            <PhoneInput
              ref={phone => {
                this.phone = phone;
              }}
              value={phone}
              onChangePhoneNumber={this.handleChange}
              autoFormat="true"
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

export default PhoneNumberScreen;
