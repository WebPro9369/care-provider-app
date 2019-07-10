/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */
import React from "react";
import { ActivityIndicator } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import {
  ListTouchableButtonWrapper,
  ListButtonText,
  TouchableWrapper
} from "./styles";
import { ContainerView, View, FlexView } from "../../../components/views";
import { colors } from "../../../utils/constants";
import { getCareProvider } from "../../../services/opear-api";

@inject("store")
@observer
class PayoutsScreen extends React.Component {
  propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.getProviderInfo();
  }

  getProviderInfo() {
    this.setState({ loading: true });
    const {
      store: { currentUserStore }
    } = this.props;
    getCareProvider(currentUserStore.id, {
      successHandler: res => {
        if (res.status === 200) {
          currentUserStore
            .setStripeBalance(res.data.stripe_balance)
            .setPayoutAccount(res.data.payout_account);
          this.setState({
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
        }
      },
      errorHandler: () => {
        this.setState({
          loading: false
        });
      }
    });
  }

  render() {
    const {
      navigation: { navigate, getParam },
      store: {
        applicationStore: { CareProviderSubscriptionsActive },
        currentUserStore: { payout_account, stripe_balance }
      }
    } = this.props;
    const screenRef = getParam("screenRef", null);
    const { loading } = this.state;
    const bankLast4 = payout_account
      ? `****${payout_account.last4}`
      : "Please setup bank";

    return (
      <ContainerView padding={16}>
        <NavHeader
          title="Payouts / Payments"
          size="medium"
          hasBackButton
          onPressBackButton={() => navigate("AccountDefault")}
        />
        <View>
          <FlexView
            justifyContent="start"
            style={{ paddingTop: 16, paddingBottom: 16 }}
          >
            <StyledText
              fontFamily="FlamaMedium"
              fontSize={24}
              color={colors.BLACK87}
            >
              {"Total Earnings: "}
            </StyledText>
            {loading ? (
              <ActivityIndicator size="small" color={colors.SEAFOAMBLUE} />
            ) : (
              <StyledText fontSize={24} color={colors.SEAFOAMBLUE}>
                ${stripe_balance || "0"}
              </StyledText>
            )}
          </FlexView>
          <View style={{ paddingTop: 16, paddingBottom: 16 }}>
            <ListTouchableButtonWrapper
              onPress={() => navigate("AccountEditBank")}
            >
              <FlexView justifyContent="start">
                <FontAwesome
                  name="bank"
                  size={30}
                  color={colors.BLUE}
                  style={{ marginRight: 16 }}
                />
                <ListButtonText>{bankLast4}</ListButtonText>
              </FlexView>
              <FontAwesome
                name="angle-right"
                color={colors.MIDGREY}
                size={24}
              />
            </ListTouchableButtonWrapper>
            {CareProviderSubscriptionsActive && (
              <View>
                {payout_account && payout_account.length > 0 && (
                  <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                    {[payout_account[payout_account.length - 1]].map(pm => {
                      return (
                        <ListTouchableButtonWrapper
                          key={pm.last4}
                          onPress={() =>
                            navigate("PaymentAddCard", { last4: pm.last4 })
                          }
                        >
                          <FlexView justifyContent="start">
                            <ListButtonText>{`****${pm.last4}`}</ListButtonText>
                          </FlexView>
                          <FontAwesome
                            name="angle-right"
                            color={colors.MIDGREY}
                            size={24}
                          />
                        </ListTouchableButtonWrapper>
                      );
                    })}
                  </View>
                )}
                {(!payout_account || !payout_account.length) && (
                  <View style={{ marginTop: 16, marginLeft: 28 }}>
                    <TouchableWrapper
                      onPress={() => navigate("PaymentAddCard", { screenRef })}
                    >
                      <FlexView justifyContent="start">
                        <AntDesign
                          name="pluscircleo"
                          size={24}
                          color={colors.LIGHTGREEN}
                          style={{
                            marginRight: 24
                          }}
                        />
                        <StyledText fontFamily="FlamaMedium" fontSize={16}>
                          Add payment method
                        </StyledText>
                      </FlexView>
                    </TouchableWrapper>
                    <View style={{ marginTop: 16 }}>
                      <StyledText fontSize={16}>
                        You will be charged an annual subscription of $995 once
                        you complete your first visit.
                      </StyledText>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ContainerView>
    );
  }
}

export default PayoutsScreen;
