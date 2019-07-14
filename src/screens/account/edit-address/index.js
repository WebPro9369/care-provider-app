/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prefer-template */
import React from "react";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  View,
  ContainerView,
  FlexView,
  FormWrapper,
  TouchableView
} from "../../../components/views";
import { FormInputView } from "../../../components/views/keyboard-view";
import { KeyboardScrollView } from "../../../components/views/keyboard-scroll-view";
import { createAddress, updateAddress } from "../../../services/opear-api";
import { colors, GOOGLE_API_KEY } from "../../../utils/constants";

const { DARKSKYBLUE } = colors;

@inject("store")
@observer
class EditAddressScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        currentUserStore: {
          address: { name, street, city, zip }
        }
      }
    } = this.props;

    this.state = {
      name,
      street,
      city,
      zip
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
              if (a.types.includes("street_number")) {
                address = a.short_name;
              }

              if (a.types.includes("route")) {
                address += " " + a.short_name;
                this.setState({
                  street: address
                });
              }

              if (a.types.includes("locality")) {
                this.setState({
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
            return Alert.alert(
              "There was an issue",
              "Google Map API failed to get your location."
            );
          });
      },
      error => {
        console.tron.log("Error getting current location: ", error);
        Alert.alert("There was an issue", "Failed to get current location.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  handleChange = field => value => {
    this.setState({ [field]: value });
  };

  onSubmit = () => {
    const {
      navigation: { goBack },
      store: {
        currentUserStore: { address }
      }
    } = this.props;

    const { street, city, zip, name } = this.state;
    const updatedFields = Object.keys(this.state).filter(key => {
      if (!this.state[key]) {
        return false;
      }

      if (address[key] === this.state[key]) {
        return false;
      }
      return true;
    });

    const data = {
      name: name || address.name,
      city: city || address.city,
      street: street || address.street,
      zip: zip || address.zip,
      state: address.state
    };

    const successHandler = () => {
      address
        .setName(data.name)
        .setStreet(data.street)
        .setCity(data.city)
        .setZipCode(data.zip);

      goBack();
    };

    const errorHandler = () => {
      Alert.alert("Error", "Failed to update the address.");
    };

    if (updatedFields.includes("name") && updatedFields.length === 1) {
      return updateAddress(address.id, data, { successHandler, errorHandler });
    }

    return createAddress(data, { successHandler, errorHandler });
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;

    const { name, street, city, zip } = this.state;
    return (
      <ContainerView style={{ paddingTop: 16 }}>
        <NavHeader
          title="Edit Address"
          size="medium"
          hasBackButton
          style={{ paddingLeft: 16 }}
          onPressBackButton={() => goBack()}
        />
        <KeyboardScrollView padding={16}>
          <FormWrapper>
            <FormInputView>
              <FormTextInput
                label="Address"
                value={street}
                rightIcon={
                  <TouchableView onPress={this.setCurrentLocation}>
                    <FontAwesome
                      name="map-marker"
                      size={30}
                      color={DARKSKYBLUE}
                    />
                  </TouchableView>
                }
                onChangeText={this.handleChange("street")}
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
                  onChangeText={this.handleChange("city")}
                />
                <FormTextInput
                  label="Zip"
                  wrapperStyle={{
                    flex: 1
                  }}
                  value={zip}
                  onChangeText={this.handleChange("zip")}
                />
              </FlexView>
            </FormInputView>
            <FormInputView>
              <FormTextInput
                label="Location Name"
                value={name}
                onChangeText={this.handleChange("name")}
              />
            </FormInputView>
          </FormWrapper>
          <View style={{ paddingBottom: 32 }}>
            <ServiceButton title="Update Address" onPress={this.onSubmit} />
          </View>
        </KeyboardScrollView>
      </ContainerView>
    );
  }
}

export default EditAddressScreen;
