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
class EditNameScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        currentUserStore: { firstName, lastName }
      }
    } = props;
    this.state = {
      name: `${firstName} ${lastName}`
    };
  }

  handleChange = name => {
    this.setState({ name });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { currentUserStore }
    } = this.props;

    const { id } = currentUserStore;
    const { name } = this.state;
    const data = { name };

    const successHandler = () => {
      const [firstName, lastName] = name.split(" ");
      currentUserStore.setFirstName(firstName).setLastName(lastName);
      goBack();
    };

    updateCareProvider(id, data, { successHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;

    const { name } = this.state;

    return (
      <KeyboardAvoidingView enabled>
        <DeeplinkHandler navigation={this.props.navigation}/>
        <NavHeader
          title="Edit name"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Name"
              value={name}
              onChangeText={this.handleChange}
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Name" onPress={this.onSubmit} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditNameScreen;
