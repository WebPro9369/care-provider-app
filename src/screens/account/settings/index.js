/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React from "react";
import { ActivityIndicator, Alert, Switch } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { removeAuthentication } from "@services/authentication";
import { updateCareProvider } from "@services/opear-api";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { InputButton } from "../../../components/input-button";
import { ServiceButton } from "../../../components/service-button";
import { KeyboardAvoidingView } from "../../../components/views/keyboard-view";

import {
  HeaderWrapper,
  ViewCentered,
  FlexView,
  View
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";
import { formatPhoneNumber } from "@utils/helpers";

const { GREEN, MIDGREY } = colors;
const imgDoctor = require("../../../../assets/images/Doctor.png");

@inject("store")
@observer
class SettingsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      store: {
        currentUserStore: { avatar, smsNotification }
      }
    } = this.props;

    this.state = {
      loading: false,
      avatarSource: { uri: avatar },
      smsNotification
    };
  }

  onAddAvatar = () => {
    const options = {
      title: "Select Profile Picture"
    };

    const {
      store: { currentUserStore }
    } = this.props;

    ImagePicker.showImagePicker(options, response => {
      console.tron.log("Response = ", response);

      if (response.didCancel) {
        console.tron.log("User cancelled image picker");
      } else if (response.error) {
        console.tron.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.tron.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });

        currentUserStore.setAvatar(source.uri);

        const successHandler = res => {
          console.tron.log(res.data);
        };

        const parts = source.uri.split('/');
        const name = parts[parts.length -1];

        const data = new FormData();
        data.append('id', currentUserStore.id);
        data.append('care_provider[avatar]', {
          name,
          uri: source.uri,
          type: 'image/jpg'
        });

        updateCareProvider(currentUserStore.id, data, { successHandler });
      }
    });
  };

  onChangeSmsNotification = value => {
    const {
      store: { currentUserStore }
    } = this.props;

    console.tron.log("Sms notification: ", value);

    const data = {
      care_provider: {
        sms_notification: value
      }
    };

    const successHandler = ({ data: { sms_notification } }) => {
      this.setState({ loading: false, smsNotification: sms_notification }, () =>
        currentUserStore.setSmsNotification(sms_notification)
      );
    };

    const errorHandler = () => {
      this.setState({ loading: false }, () =>
        Alert.alert("Error", "Failed to update SMS Notification setting.")
      );
    };

    this.setState({
      loading: true
    });

    updateCareProvider(currentUserStore.id, data, {
      successHandler,
      errorHandler
    });
  };

  logOut = () => {
    const {
      navigation: { navigate }
    } = this.props;

    removeAuthentication();

    navigate("Authenticating");
  };

  render() {
    const {
      navigation: { navigate },
      store: {
        currentUserStore: {
          firstName,
          lastName,
          email,
          phone,
          address,
          application: { biography, specialties }
        }
      }
    } = this.props;
    const name = `${firstName} ${lastName}`;

    const { loading, avatarSource, smsNotification } = this.state;
    const avatarOptions = { source: imgDoctor };

    if (avatarSource.uri !== "/images/original/missing.png") {
      avatarOptions.source = { uri: avatarSource.uri };
    }

    return (
      <KeyboardAvoidingView enabled>
        <HeaderWrapper>
          <NavHeader
            title="Settings"
            size="medium"
            hasBackButton
            onPressBackButton={() => navigate("AccountDefault")}
          />
        </HeaderWrapper>
        {loading && (
          <ViewCentered paddingBottom={12} style={{ flex: 1 }}>
            <ActivityIndicator size="large" color={colors.SEAFOAMBLUE} />
          </ViewCentered>
        )}
        {!loading && (
          <ScrollView>
            <ViewCentered paddingTop={0}>
              <Avatar
                {...avatarOptions}
                rounded
                size={120}
                showEditButton
                editButton={{
                  containerStyle: {
                    backgroundColor: GREEN,
                    borderRadius: 12
                  },
                  size: 24,
                  onPress: this.onAddAvatar
                }}
              />
            </ViewCentered>
            <View style={{ marginBottom: 45 }}>
              <StyledText fontSize={24}>Personal Information</StyledText>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Name"
                  value={name}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("AccountEditName")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Address"
                  value={address.street}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("AccountEditAddress")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Email"
                  value={email}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("AccountEditEmail")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Phone Number"
                  value={formatPhoneNumber(phone)}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("AccountEditPhoneNumber")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Specialties"
                  value={specialties.join(", ")}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("AccountEditSpecialties")}
                />
              </View>
              <View style={{ padding: 16 }}>
                <InputButton
                  label="Short Biography"
                  value={biography}
                  icon={
                    <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                  }
                  onPress={() => navigate("AccountEditBio")}
                />
              </View>
              <FlexView style={{ padding: 16 }}>
                <StyledText fontSize={20}>SMS Notifications</StyledText>
                <Switch
                  value={smsNotification}
                  onValueChange={this.onChangeSmsNotification}
                />
              </FlexView>
            </View>
            <View style={{ marginTop: 32, marginBottom: 32 }}>
              <ServiceButton title="Log Out" onPress={this.logOut} />
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default SettingsScreen;
