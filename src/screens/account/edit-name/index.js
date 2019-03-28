import React from "react";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";

class EditNameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Michael Brown"
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { email } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit name"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput label="Name" value={email} />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Name" onPress={() => goBack()} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditNameScreen;
