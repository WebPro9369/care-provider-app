import React from "react";
import { Linking } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../components/text";
import { ProviderCard } from "../../components/cards";
import { ListTouchableButtonWrapper, ListButtonText } from "./styles";
import { ContainerView, View } from "../../components/views";
import { colors } from "../../utils/constants";

const imgDoctor = require("../../../assets/images/Doctor.png");

class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Dr. John Smith",
      avatarImg: imgDoctor,
      rating: "4.5",
      bio: "Hi, this is my bio",
      history: "Hi, this is my work history, line two of my work history",
      badges: ["Specialty", "Credentials", "Experience"]
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { name, avatarImg, rating, bio, history, badges } = this.state;
    return (
      <ContainerView padding={16}>
        <View style={{ paddingTop: 24, paddingBottom: 24 }}>
          <StyledText
            fontSize={28}
            fontFamily="FlamaMedium"
            lineHeight={30}
            color={colors.BLACK87}
          >
            Account
          </StyledText>
        </View>
        <ProviderCard
          avatarImg={avatarImg}
          name={name}
          bio={bio}
          history={history}
          rating={rating}
          badges={badges}
        />
        <View style={{ paddingTop: 16, paddingBottom: 16 }}>
          <ListTouchableButtonWrapper
            onPress={() => navigate("AccountSettings")}
          >
            <ListButtonText>Settings</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper
            onPress={() => navigate("AccountPayouts")}
          >
            <ListButtonText>Payouts</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper
            onPress={() => navigate("AccountUpdateApplication")}
          >
            <ListButtonText>Update Application</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
          <ListTouchableButtonWrapper
            onPress={() => Linking.openURL("mailto:help@opear.com")}
          >
            <ListButtonText>Support</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
        </View>
      </ContainerView>
    );
  }
}

export default AccountScreen;
