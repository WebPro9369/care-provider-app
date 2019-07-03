/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { Linking } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { inject, observer, PropTypes } from "mobx-react";
import { removeAuthentication } from "@services/authentication";
import { StyledText } from "../../components/text";
import { ProviderCard } from "../../components/cards";
import { ListTouchableButtonWrapper, ListButtonText } from "./styles";
import { ContainerView, View } from "../../components/views";
import { colors } from "../../utils/constants";
import { DeeplinkHandler } from "@components/deeplink-handler";

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
      avatarImg: imgDoctor
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this._onFocusListener = navigation.addListener("didFocus", () => {
      this.forceUpdate();
    });
  }

  logOut = () => {
    const {
      navigation: { navigate },
      store: { currentUserStore }
    } = this.props;

    removeAuthentication();

    currentUserStore.reset();

    navigate("Authenticating");
  };

  render() {
    const {
      store,
      navigation: { navigate }
    } = this.props;
    const { avatarImg } = this.state;
    const {
      currentUserStore: {
        firstName,
        lastName,
        application: { biography, workHistory, specialties },
        rating
      }
    } = store;

    return (
      <ContainerView padding={16}>
        <DeeplinkHandler navigation={this.props.navigation}/>
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
          history={workHistory.join(", ")}
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
