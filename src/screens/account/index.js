import React from "react";
import { AsyncStorage, Linking } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { inject, observer, PropTypes } from "mobx-react";
import { StyledText } from "../../components/text";
import { ProviderCard } from "../../components/cards";
import { ListTouchableButtonWrapper, ListButtonText } from "./styles";
import { ContainerView, View } from "../../components/views";
import { colors } from "../../utils/constants";

const imgDoctor = require("../../../assets/images/Doctor.png");

@inject("store")
@observer
class AccountScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      avatarImg: imgDoctor,
      rating: "4.5",
    };
  }

  logOut = () => {
    const {
      navigation: { navigate }
    } = this.props;

    AsyncStorage.removeItem('currentUser');

    navigate("AccountSignIn")
  };

  render() {
    const {
      store,
      navigation: { navigate }
    } = this.props;
    const { avatarImg, rating } = this.state;
    const { currentUserStore: { 
      firstName, lastName,
      application: {
        biography,
        workHistory,
        specialties,
      }
    } } = store;
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
          name={`${firstName} ${lastName}`}
          bio={biography}
          history={workHistory.join(', ')}
          rating={rating}
          badges={specialties}
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
          <ListTouchableButtonWrapper onPress={this.logOut}>
            <ListButtonText>Log Out</ListButtonText>
            <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
          </ListTouchableButtonWrapper>
        </View>
      </ContainerView>
    );
  }
}

export default AccountScreen;
