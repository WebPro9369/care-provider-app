import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import {
  TouchableWrapper,
  ListTouchableButtonWrapper,
  ListButtonText
} from "./styles";
import { ContainerView, View, FlexView } from "../../../components/views";
import { colors } from "../../../utils/constants";

class PayoutsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: [
        // { id: 1, type: "Paypal" },
        { id: 2, type: "Card", number: "****4985" },
        { id: 3, type: "Bank", number: "****5827" }
      ]
    };
  }

  render() {
    const {
      navigation: { navigate }
    } = this.props;
    const { paymentMethods } = this.state;
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
            <StyledText fontSize={24} color={colors.SEAFOAMBLUE}>
              $1200
            </StyledText>
          </FlexView>
          <View style={{ paddingTop: 16, paddingBottom: 16 }}>
            {paymentMethods.map(pm => {
              if (pm.type === "Card") {
                return (
                  <ListTouchableButtonWrapper
                    key={pm.id}
                    onPress={() => navigate("AccountEditCard")}
                  >
                    <FlexView justifyContent="start">
                      <FontAwesome
                        name="cc-visa"
                        size={30}
                        color={colors.BLUE}
                        style={{ marginRight: 16 }}
                      />
                      <ListButtonText>{pm.number}</ListButtonText>
                    </FlexView>
                    <FontAwesome
                      name="angle-right"
                      color={colors.MIDGREY}
                      size={24}
                    />
                  </ListTouchableButtonWrapper>
                );
              }
              if (pm.type === "Bank") {
                return (
                  <ListTouchableButtonWrapper
                    key={pm.id}
                    onPress={() => navigate("AccountEditBank")}
                  >
                    <FlexView justifyContent="start">
                      <FontAwesome
                        name="bank"
                        size={30}
                        color={colors.BLUE}
                        style={{ marginRight: 16 }}
                      />
                      <ListButtonText>{pm.number}</ListButtonText>
                    </FlexView>
                    <FontAwesome
                      name="angle-right"
                      color={colors.MIDGREY}
                      size={24}
                    />
                  </ListTouchableButtonWrapper>
                );
              }
              if (pm.type === "Paypal") {
                return (
                  <ListTouchableButtonWrapper key={pm.id}>
                    <FlexView justifyContent="start">
                      <FontAwesome
                        name="paypal"
                        size={30}
                        color={colors.BLUE}
                        style={{ marginRight: 16 }}
                      />
                      <ListButtonText>Paypal</ListButtonText>
                    </FlexView>
                    <FontAwesome
                      name="angle-right"
                      color={colors.MIDGREY}
                      size={24}
                    />
                  </ListTouchableButtonWrapper>
                );
              }

              return null;
            })}
          </View>
          <View style={{ marginTop: 8, marginLeft: 28 }}>
            <TouchableWrapper onPress={() => navigate("AccountAddBank")}>
              <FlexView justifyContent="start">
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={colors.DARKSKYBLUE}
                  style={{
                    marginRight: 24
                  }}
                />
                <StyledText fontFamily="FlamaMedium" fontSize={16}>
                  Add payment method
                </StyledText>
              </FlexView>
            </TouchableWrapper>
          </View>
        </View>
      </ContainerView>
    );
  }
}

export default PayoutsScreen;
