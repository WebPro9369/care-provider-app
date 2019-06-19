import React, { Component } from "react";
import { Image, View, Alert, NativeModules, Linking } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import axios from "axios";
import Geolocation from "react-native-geolocation-service";
import TouchID from "react-native-touch-id";
import Geocoder from "react-native-geocoder";
import { ServiceButton } from "@components/service-button";
import { StyledText, StyledTextInput } from "@components/text";
import { NavHeader } from "@components/nav-header";
import { KeyboardAvoidingView } from "@components/views/keyboard-view";
import { colors, GOOGLE_API_KEY } from "@utils/constants";

const imgProgressbar = require("@assets/images/ProgressBar1.png");

@inject("store")
@observer
class AskLocationScreen extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      zipcode: ''
    };
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);

    const {
      store: { currentUserStore: { address } }
    } = this.props;
    Geolocation.getCurrentPosition(
      position => {
        if (
          !position ||
          !position.coords ||
          !position.coords.latitude ||
          !position.coords.longitude
        ) {
          return Alert.alert("Failed to get your location.");
        }
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

        // const key = "AIzaSyBu1rXRtcQVBHRHotogui7F2FWT9WpfcNw";
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
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + pos.lat + "," + pos.lng + "&key=" + GOOGLE_API_KEY)
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
              addressComponents.forEach(item => {
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

    // check what types of biometrics are supported
    TouchID.isSupported()
      .then(biometryType => {
        // this.setState({ biometryType });
        console.tron && console.tron.log("Supported biometry: ", biometryType);
      })
      .catch(error => {
        console.tron &&
          console.tron.log("Error checking Touch id support: ", error);
        // console.tron.log("NativeModules: ", NativeModules);
      });
  }

  handleInputChange = text => {
    this.setState({
      zipcode: text.replace(/\D/, "")
    });
  };

  onSubmit = () => {
    const {
      navigation: { navigate },
      store: { currentUserStore: { address } }
    } = this.props;
    const { zipcode } = this.state;

    if (zipcode.length !== 5) return Alert.alert("Please enter a \n valid US zip code.");

    if (zipcode) address.setZipCode(zipcode);
    return navigate("NameCapture");
    // return TouchID.isSupported()
    //   .then(biometryType => {
    //     console.tron.log("BiometryType: ", biometryType);
    //     TouchID.authenticate()
    //       .then(success => {
    //         Alert.alert("Authenticated Successfully");
    //       })
    //       .catch(error => {
    //         console.tron.log(error);
    //         Alert.alert("Authentication failed.");
    //       });
    //   })
    //   .catch(error => {
    //     console.tron.log("TouchID not supported: ", error);
    //     Alert.alert("Touch ID is not supported.");
    //   });
  };

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];

    if (routeName === 'newpwd') {
      navigate('AccountNewPwd',{routeInfo:route});
    };
  }

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
              maxLength={5}
            />
          </View>
        </View>
        <View>
          <Image
            source={imgProgressbar}
            resizeMode="contain"
            style={{ width: "100%", marginBottom: 16 }}
          />
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
