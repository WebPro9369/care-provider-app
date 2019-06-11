import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { StyledText } from "../../../components/text";
import { StyledMaskedTextInput } from "../../../components/text-masked";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { View } from "../../../components/views";
import { updateCareProvider } from "../../../services/opear-api";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class EditPhoneNumberScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const { store: { currentUserStore: { phone } } }  = props;

    this.state = {
      phone,
    };
  }

  handleInputChange = (phone) => {
    this.setState({ phone });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: { currentUserStore }
    } = this.props;

    const { id } = currentUserStore;
    const { phone } = this.state;
    const data = { phone };

    const successHandler = () => {
      currentUserStore.setPhone(phone);
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
    const { phone } = this.state;

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
          <View>
            <StyledMaskedTextInput
              fontSize={28}
              autoFocus
              placeholder="(123) 456 - 7890"
              keyboardType="number-pad"
              type="custom"
              options={{ mask: "(999) 999-9999" }}
              value={phone}
              onChangeText={this.handleInputChange}
            />
          </View>
        </View>
        {/* <View style={{ paddingLeft: 16 }}>
          <StyledText fontSize={16} color={colors.BLACK38}>
            A verification code will be sent to this number
          </StyledText>
        </View> */}
        <View style={{ marginTop: 250 }}>
          <ServiceButton title="Update Phone" onPress={this.onSubmit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default EditPhoneNumberScreen;
