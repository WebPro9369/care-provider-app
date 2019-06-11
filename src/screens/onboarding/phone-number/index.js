import React, { Component } from "react";
import { Image, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { ServiceButton } from "../../../components/service-button";
import { StyledText } from "../../../components/text";
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

  handleInputChange = phone => {
    this.setState({ phone });
  };

  onSubmit = () => {
    const { phone } = this.state;
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;

    console.tron.log("Phone number: ", phone);

    {
      /* if(!this.phone.isValidNumber())
    {
      return Alert.alert("Please enter a valid phone number.");
    }*/
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
          <View>
            <TextInputMask
              fontSize={28}
              autoFocus
              placeholder="(123) 456 - 7890"
              value={phone}
              keyboardType="number-pad"
              type="custom"
              options={{ mask: "(999) 999-9999" }}
              onChangeText={this.handleInputChange}
            />
          </View>
          {/* }<View
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
          </View>*/}
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
