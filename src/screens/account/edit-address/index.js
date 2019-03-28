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

const { DARKSKYBLUE } = colors;

class EditAddressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "22341 Justice Avenue",
      city: "San Francisco",
      zip: "94043",
      locationName: "Eddie's House"
    };
  }

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { address, city, zip, locationName } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit Address"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Address"
              value={address}
              rightIcon={
                <FontAwesome name="map-marker" size={30} color={DARKSKYBLUE} />
              }
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="City"
                style={{
                  width: 120,
                  marginRight: 40
                }}
                value={city}
              />
              <FormTextInput
                label="Zip"
                style={{
                  width: 120
                }}
                value={zip}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput label="Location Name" value={locationName} />
          </FormInputView>
        </FormWrapper>
        <ServiceButton title="Update Address" onPress={() => goBack()} />
      </KeyboardAvoidingView>
    );
  }
}

export default EditAddressScreen;
