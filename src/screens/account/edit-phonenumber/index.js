import React from "react";
import PhoneInput from "react-native-phone-input";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { View } from "../../../components/views";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

class EditPhoneNumberScreen extends React.Component {
  render() {
    const {
      navigation: { goBack }
    } = this.props;
    return (
      <KeyboardAvoidingView startFromTop behavior="padding" enabled>
        <NavHeader
          title="Edit phone number"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <View style={{ padding: 16 }}>
          <StyledText fontSize={14}>Phone number</StyledText>
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
            />
          </View>
        </View>
        <View style={{ paddingLeft: 16 }}>
          <StyledText fontSize={16} color={colors.BLACK38}>
            A verification code will be sent to this number
          </StyledText>
        </View>
        <View style={{ marginTop: 250 }}>
          <ServiceButton title="Update Phone" onPress={() => goBack()} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EditPhoneNumberScreen;
