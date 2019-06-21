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
class EditBioScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        currentUserStore: {
          application: { biography }
        }
      }
    } = props;
    this.state = {
      biography
    };
  }

  handleChange = biography => {
    this.setState({ biography });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: {
        currentUserStore: { id, application }
      }
    } = this.props;

    const { biography } = this.state;
    const data = { care_provider: { biography } };

    const successHandler = () => {
      application.setBiography(biography);
      goBack();
    };

    updateCareProvider(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;

    const { biography } = this.state;

    return (
      <KeyboardAvoidingView enabled>
        <NavHeader
          title="Edit biography"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Short Biography"
              value={biography}
              onChangeText={this.handleChange}
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Biography" onPress={this.onSubmit} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditBioScreen;
