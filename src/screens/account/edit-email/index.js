import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormWrapper } from "../../../components/views";
import { updateCareProvider } from "../../../services/opear-api";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";

@inject("store")
@observer
class EditEmailScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        currentUserStore: { email }
      }
    } = props;

    this.state = {
      email
    };
  }

  handleChange = email => {
    this.setState({ email });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { currentUserStore }
    } = this.props;

    const { id } = currentUserStore;
    const { email } = this.state;
    const data = { email };

    const successHandler = () => {
      currentUserStore.setEmail(email);
      goBack();
    };

    updateCareProvider(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;

    const { email } = this.state;

    return (
      <KeyboardAvoidingView enabled>
        <NavHeader
          title="Edit email"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Email"
              value={email}
              onChangeText={this.handleChange}
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Email" onPress={this.onSubmit} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditEmailScreen;
