import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

const { BLUE } = colors;

class AddBankScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: null,
      routingNumber: null
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { accountNumber, routingNumber } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit bank"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Account Number"
              leftIcon={<FontAwesome name="cc-visa" size={30} color={BLUE} />}
              value={accountNumber}
            />
          </FormInputView>
          <FormInputView>
            <FormTextInput label="Routing Number" value={routingNumber} />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Save Bank" onPress={() => goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

export default AddBankScreen;
