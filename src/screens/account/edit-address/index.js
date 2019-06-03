/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prefer-template */
import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  FlexView,
  FormWrapper,
  TouchableView
} from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors, GOOGLE_API_KEY } from "../../../utils/constants";

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

  setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.tron.log("Current position: ", position);
        this.setState({
          address: "",
          city: "",
          zip: ""
        });
        return axios
          .get(
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
              position.coords.latitude +
              "," +
              position.coords.longitude +
              "&key=" +
              GOOGLE_API_KEY
          )
          .then(res => {
            const addressComponents =
              res.data &&
              res.data.results[0] &&
              res.data.results[0].address_components;
            // const formattedAddress =
            //   res.data &&
            //   res.data.results[0] &&
            //   res.data.results[0].formatted_address;

            console.tron.log(
              "Google response: ",
              res.data.results[0].address_components
            );

            let address = "";
            // eslint-disable-next-line no-restricted-syntax
            for (const a of addressComponents) {
              if (!a.types.includes("locality")) {
                address += " ";
                address += a.short_name;
              } else {
                this.setState({
                  address,
                  city: a.short_name
                });
              }

              if (a.types.includes("postal_code")) {
                this.setState({
                  zip: a.short_name
                });
              }
            }
          })
          .catch(err => {
            console.tron.log("Google map api error: ", err);
            return Alert.alert("Google Map API failed to get your location.");
          });
      },
      error => {
        console.tron.log("Error getting current location: ", error);
        Alert.alert("Failed to get current location.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

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
                <TouchableView onPress={this.setCurrentLocation}>
                  <FontAwesome
                    name="map-marker"
                    size={30}
                    color={DARKSKYBLUE}
                  />
                </TouchableView>
              }
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="City"
                wrapperStyle={{
                  flex: 1,
                  marginRight: 20
                }}
                value={city}
              />
              <FormTextInput
                label="Zip"
                wrapperStyle={{
                  flex: 1
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
