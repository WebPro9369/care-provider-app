import React from "react";
import { ActivityIndicator } from "react-native";
import { inject, observer } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ListTouchableButtonWrapper, ListButtonText } from "./styles";
import { ContainerView, View, FlexView } from "../../../components/views";
import { colors } from "../../../utils/constants";
import { getCareProvider } from "../../../services/opear-api";

@inject("store")
@observer
class PayoutsScreen extends React.Component {
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
      store: {
        currentUserStore
      }
    } = this.props;
    getCareProvider(
      currentUserStore.id,
      res => {
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
      () => {
        this.setState({
          loading: false
        });
      }
    );
  }

  render() {
    const {
      navigation: { navigate },
      store: {
        currentUserStore: { payout_account, stripe_balance }
      }
    } = this.props;
    const { loading } = this.state;
    const bankLast4 = payout_account.last4
      ? `****${payout_account.last4}`
      : "Please setup bank";

    return (
      <ContainerView padding={16}>
        <NavHeader
          title="Payout Methods"
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
            {loading 
              ? <ActivityIndicator size="small" color={colors.SEAFOAMBLUE} />
              : (
                <StyledText fontSize={24} color={colors.SEAFOAMBLUE}>
                  {stripe_balance || "0"}$
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
          </View>
        </View>
      </ContainerView>
    );
  }
}

export default PayoutsScreen;
