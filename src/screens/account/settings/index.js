import React from "react";
import { Avatar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText, FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { InputButton } from "../../../components/input-button";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  HeaderWrapper,
  ViewCentered,
  View,
  FormInputWrapper
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";

const { GREEN, MIDGREY } = colors;
const imgDoctor = require("../../../../assets/images/Doctor.png");

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Michael Brown",
      address: "22341 Justice Ave APT 725",
      email: "michaelbrown@gmail.com",
      phone: "(415) 123 - 4567",
      biography: ""
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { name, address, email, phone, biography } = this.state;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Settings"
            size="medium"
            hasBackButton
            onPressBackButton={() => navigate("AccountDefault")}
          />
        </HeaderWrapper>
        <ScrollView>
          <ViewCentered paddingTop={0}>
            <Avatar
              rounded
              size={120}
              source={imgDoctor}
              showEditButton
              editButton={{
                containerStyle: {
                  backgroundColor: GREEN,
                  borderRadius: 12
                },
                size: 24
              }}
            />
          </ViewCentered>
          <View>
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
                value={address}
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
                value={phone}
                icon={
                  <FontAwesome name="angle-right" size={24} color={MIDGREY} />
                }
                onPress={() => navigate("AccountEditPhoneNumber")}
              />
            </View>
            <View style={{ padding: 16 }}>
              <FormInputWrapper>
                <FormTextInput
                  label="Short Biography"
                  value={biography}
                  placeholder="Short Biography"
                />
              </FormInputWrapper>
            </View>
          </View>
          <View style={{ marginTop: 32, marginBottom: 32 }}>
            <ServiceButton
              title="Log Out"
              onPress={() => console.tron.log("Logout clicked")}
            />
          </View>
          {/* <View>
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={24}
              style={{ paddingTop: 24, paddingBottom: 16 }}
            >
              Edit Children
            </StyledText>
            <ContentButton>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  Benjamin
                </StyledText>
              </FlexView>
              <StyledText fontFamily="Flama" fontSize={16}>
                6 yrs
              </StyledText>
            </ContentButton>
            <ContentButton>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  Audrey
                </StyledText>
              </FlexView>
              <StyledText fontFamily="Flama" fontSize={16}>
                8 yrs
              </StyledText>
            </ContentButton>
            <ContentButton onPress={() => navigate("SettingsEditChild")}>
              <FlexView>
                <Avatar rounded size={40} source={imgFoxLarge} />
                <StyledText
                  fontFamily="Flama"
                  fontSize={16}
                  style={{ marginLeft: 12 }}
                >
                  Tara
                </StyledText>
              </FlexView>
              <StyledText fontFamily="Flama" fontSize={16}>
                12 yrs
              </StyledText>
            </ContentButton>
          </View> */}
        </ScrollView>
      </ContainerView>
    );
  }
}

export default SettingsScreen;
