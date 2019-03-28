import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FlexView, FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

const { BLUE, DARKSKYBLUE } = colors;

class EditCardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: "1234 5678 3456 2456",
      expDate: "05 / 2020",
      cvv: "698",
      fullName: "Michael Brown"
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { cardNumber, expDate, cvv, fullName } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit Card"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Card Number"
              leftIcon={<FontAwesome name="cc-visa" size={30} color={BLUE} />}
              rightIcon={
                <FontAwesome name="camera" size={30} color={DARKSKYBLUE} />
              }
              value={cardNumber}
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="Exp. Date"
                style={{
                  width: 120,
                  marginRight: 40
                }}
                value={expDate}
              />
              <FormTextInput
                label="CVV"
                style={{
                  width: 120
                }}
                value={cvv}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput label="Full Name" value={fullName} />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Save Card" onPress={() => goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditCardScreen;
