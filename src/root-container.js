import React from "react";
import { Alert, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { inject, observer, PropTypes } from "mobx-react";
import UserInactivity from "react-native-user-inactivity";
import TouchID from "react-native-touch-id";
import styled from "styled-components/native";
import stripe from "tipsi-stripe";
import AppNavigationContainer from "./navigation/main.navigator";
import { colors } from "./utils/constants";

stripe.setOptions({
  publishableKey: "pk_test_icZtWoaCwbJCemzBqBdTV6Cb", // test key
  // publishableKey: "pk_live_2YK7fEg9qnlrawyTukjyVUs9', // live key
  androidPayMode: "test" // "production"
});

const Root = styled.View`
  flex: 1;
  background-color: ${props => props.theme.WHITE};
`;

@inject("store")
@observer
class RootContainer extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      firstTime: true,
      active: true
    };
  }

  componentDidMount() {
    const {
      store: {
        currentUserStore: { apiKey }
      }
    } = this.props;
    if (apiKey) {
      this.showTouchId(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      store: {
        currentUserStore: { apiKey }
      }
    } = this.props;
    const {
      store: { currentUserStore: nextUserStore }
    } = nextProps;

    if (apiKey !== nextUserStore.apiKey && nextUserStore.apiKey) {
      this.showTouchId(false);
    }
  }

  showTouchId = active => {
    const { firstTime } = this.state;

    if (firstTime || active) {
      this.setState({
        firstTime: false
      });

      TouchID.isSupported()
        .then(biometryType => {
          console.tron.log("BiometryType: ", biometryType);
          TouchID.authenticate()
            .then(() => {
              Alert.alert("Authenticated Successfully");
            })
            .catch(error => {
              console.tron.log(error);
              Alert.alert("Authentication failed.");
            });
        })
        .catch(error => {
          console.tron.log("TouchID not supported: ", error);
          Alert.alert("Touch ID is not supported.");
        });
    }
  };

  onAction = value => {
    const {
      store: {
        currentUserStore: { apiKey }
      }
    } = this.props;
    const { active } = this.state;

    if (console.tron) {
      // console.tron.log("Active now!", value, apiKey);
    }

    this.setState({
      active: value
    });

    if (active || !apiKey) {
      return false;
    }

    this.showTouchId(value);

    return true;
  };

  render() {
    return (
      <UserInactivity
        timeForInactivity={15 * 60 * 1000}
        onAction={this.onAction}
      >
        <ThemeProvider theme={colors}>
          <Root>
            <StatusBar />
            <AppNavigationContainer />
          </Root>
        </ThemeProvider>
      </UserInactivity>
    );
  }
}

export default RootContainer;
