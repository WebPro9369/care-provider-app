import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { StyledText, StyledTextInput, FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { View, FormWrapper } from "../../../components/views";
import { updateCareProvider } from "../../../services/opear-api";
import { KeyboardAvoidingView, FormInputView } from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";
import { commaStringToArray } from "@utils/helpers";

@inject("store")
@observer
class EditSpecialtiesScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const { store: { currentUserStore: { id, application: { specialties } } } }  = this.props;

    this.state = {
      id,
      specialties: specialties.join(", ")
    };

  }

  handleInputChange = name => value => {

    this.setState({
      [name]: value
    });

  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { currentUserStore}
    } = this.props;

    const { id } = this.state;
    const { specialties } = this.state;
    const data = { specialties };

    this.setState(
      {
        specialties: commaStringToArray(data.specialties)
      }
    )

    const successHandler = () => {
      currentUserStore.application.setSpecialties(commaStringToArray(specialties));
      goBack();
    };

    updateCareProvider(
      id,
      data,
      { successHandler }
    );
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { specialties } = this.state;

    return (
      <KeyboardAvoidingView startFromTop behavior="padding" enabled>
        <NavHeader
          title="Edit specialties"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Specialties"
              value={specialties}
              onChangeText={this.handleInputChange("specialties")}
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton title="Update Specialties" onPress={this.onSubmit} />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default EditSpecialtiesScreen;
