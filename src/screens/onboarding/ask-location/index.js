import React, { Component } from "react";
import { Image, View } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoder";
import { ServiceButton } from "../../../components/service-button";
import { StyledText, StyledTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";
import { colors, GOOGLE_API_KEY } from "../../../utils/constants";

const imgProgressbar = require("../../../../assets/images/ProgressBar1.png");

@inject("store")
@observer
class AskLocationScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      zipcode: null
    };
  }

  componentDidMount() {
    const {
      store: {
        providerStore: {
          onboardingData: { address }
        }
      }
    } = this.props;
    Geolocation.getCurrentPosition(
      position => {
        console.tron.log(
          "Current position: ",
          position.coords.latitude,
          position.coords.longitude
        );
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const ny = {
          lat: 40.7809261,
          lng: -73.9637594
        };

        const key = "AIzaSyBu1rXRtcQVBHRHotogui7F2FWT9WpfcNw";
        // Geocoder.geocodePosition({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // })
        // Geocoder.geocodeAddress("New York")
        //   .then(res => {
        //     console.tron.log("Geocode: ", res);
        //   })
        //   .catch(err => {
        //     console.tron.log("Error geocode: ", err);
        // https://maps.googleapis.com/maps/api/js?key=AIzaSyBu1rXRtcQVBHRHotogui7F2FWT9WpfcNw
        //   });
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + ny.lat + "," + ny.lng + "&key=" + key)
          .then(res => {
            const addressComponents =
              res.data &&
              res.data.results[0] &&
              res.data.results[0].address_components;
            const formattedAddress =
              res.data &&
              res.data.results[0] &&
              res.data.results[0].formatted_address;

            console.tron.log(
              "Google response: ",
              res.data.results[0].address_components
            );
            if (addressComponents) {
              addressComponents.forEach((item, index) => {
                switch (item.types[0]) {
                  case "street_number":
                    address.setApartmentNumber(item.long_name);
                    break;

                  case "route":
                    address.setStreet(item.long_name);
                    break;

                  case "postal_code":
                    address.setZipCode(item.long_name);
                    break;

                  default:
                    break;
                }

                if (item.types.includes("sublocality")) {
                  address.setCity(item.long_name);
                }
                if (item.types.includes("locality")) {
                  address.setState(item.long_name);
                }
              });
            }

            if (formattedAddress) {
              address.setName(formattedAddress);
            }

            address.setLatitude(ny.lat.toString());
            address.setLongitude(ny.lng.toString());
          })
          .catch(err => console.tron.log("Google error: ", err));
      },
      error => {
        console.tron.log("Error current position: ", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  handleInputChange = text => {
    this.setState({
      zipcode: text
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: {
        providerStore: {
          onboardingData: { address }
        }
      }
    } = this.props;
    const { zipcode } = this.state;
    console.tron.log("Location onsubmit");
    if (zipcode) address.setZipCode(zipcode);
    navigate("NameCapture");
  };

  render() {
    const { zipcode } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <View>
          <NavHeader
            title="Welcome to opear"
            hasBackButton={false}
            size="small"
          />
          <StyledText
            textAlign="left"
            style={{ marginTop: 24, marginBottom: 24 }}
          >
            Let&apos;s make sure opear is in your area:
          </StyledText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 16
            }}
          >
            <StyledTextInput
              fontSize={28}
              autoFocus
              placeholder="Zip code"
              value={zipcode}
              onChangeText={this.handleInputChange}
            />
            <FontAwesome
              name="map-marker"
              size={30}
              color={colors.DARKSKYBLUE}
            />
          </View>
        </View>
        <View>
          <Image source={imgProgressbar} style={{ marginBottom: 16 }} />
          <ServiceButton
            title="Check Availability"
            style={{ marginBottom: 20 }}
            onPress={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default AskLocationScreen;
