/* eslint-disable no-else-return */
/* eslint-disable import/no-unresolved */
import React from "react";
import stripe from "tipsi-stripe";
import { Alert } from "react-native";
import { inject, observer, PropTypes } from "mobx-react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createPaymentAccount } from "@services/opear-api";
import InactiveUserBanner from "@components/banner";
import { FormTextInput } from "../../../components/text";
import { FormMaskedTextInput } from "../../../components/text-masked";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import {
  FlexView,
  FormWrapper,
  TouchableView
} from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";

@inject("store")
@observer
class AddCardScreen extends React.Component {
  propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);

    const {
      navigation: {
        state: { params }
      }
    } = this.props;

    this.state = {
      loading: false,
      isEditing: params && params.last4 && params.last4.length === 4,
      last4: params && params.last4,
      cardInput: ""
    };
  }

  saveCardHandler = async () => {
    const {
      store: { cardStore, userStore }
    } = this.props;
    const { id } = userStore;
    const { expiryYear, expiryMonth, cvv, fullName } = cardStore.cardInfo;

    const { cardInput } = this.state;

    // Validate card number
    const cardRegExp = /^[0-9]{16}$/g;
    const amexRegExp = /^3[47][0-9]{13}$/g;
    if (!cardRegExp.test(cardInput) && !amexRegExp.test(cardInput)) {
      Alert.alert("Error", "Invalid card number.");
      return false;
    }

    const params = {
      number: cardInput,
      expMonth: expiryMonth,
      expYear: expiryYear,
      cvc: cvv,
      name: fullName
    };

    console.tron.log("Payment params: ", params);

    this.setState({ loading: true });

    try {
      const token = await stripe.createTokenWithCard(params);

      createPaymentAccount(
        id,
        {
          payment_account: {
            token_id: token.tokenId
          }
        },
        {
          successHandler: res => {
            this.setState({ loading: false });

            if (res.status === 200) {
              userStore.addPaymentAccount(res.data);
              this.previousScreen();
            } else {
              Alert.alert("Error", "There was an error saving your card.");
            }
          },
          errorHandler: () => {
            Alert.alert("Error", "There was an error saving your card.");
            this.setState({ loading: false });
          }
        }
      );
    } catch (e) {
      Alert.alert("Error", "There was an error saving your card.");
      this.setState({ loading: false });
    }
    return true;
  };

  previousScreen() {
    const {
      navigation: { getParam, navigate, goBack }
    } = this.props;

    const screenRef = getParam("screenRef", null);

    if (screenRef) {
      navigate("DashboardBookingReview", { screenRef });
    } else {
      goBack();
    }
  }

  render() {
    const {
      navigation: { navigate },
      store: { cardStore }
    } = this.props;

    const { cardInfo } = cardStore;
    const { expiryYear, expiryMonth, cvv, fullName } = cardInfo || {};

    const { loading, isEditing, last4, cardInput } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title={isEditing ? "Edit Card" : "Add Card"}
          size="medium"
          onPressBackButton={() => {
            cardStore.setCardInfo({
              cardNumber: "",
              expiryYear: "",
              expiryMonth: "",
              cvv: ""
            });
            this.previousScreen();
          }}
          hasBackButton
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Card Number"
              value={cardInput}
              placeholder={
                isEditing
                  ? `Current Card ending in ${last4}`
                  : "1234 5678 3456 2456"
              }
              onChangeText={value =>
                this.setState({
                  cardInput: value
                })
              }
              rightIcon={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <TouchableView onPress={() => navigate("PaymentScanCard")}>
                  <FontAwesome
                    name="camera"
                    size={30}
                    color={colors.LIGHTGREEN}
                  />
                </TouchableView>
              }
            />
          </FormInputView>
          <FormInputView>
            <FlexView>
              <FormTextInput
                label="Exp. Month"
                value={expiryMonth}
                placeholder="MM"
                maxLength={2}
                style={{
                  width: 120,
                  marginRight: 40
                }}
                onChangeText={value =>
                  cardStore.setCardInfo({
                    ...cardInfo,
                    expiryMonth: Number(value)
                  })
                }
              />
              <FormTextInput
                label="Exp. Year"
                value={expiryYear}
                placeholder="YY"
                maxLength={2}
                onChangeText={value =>
                  cardStore.setCardInfo({
                    ...cardInfo,
                    expiryYear: Number(value)
                  })
                }
                style={{
                  width: 120,
                  marginRight: 40
                }}
              />
              <FormMaskedTextInput
                label="CVV"
                value={cvv}
                placeholder="123"
                maskOptions={{ mask: "999" }}
                onChangeText={value =>
                  cardStore.setCardInfo({ ...cardInfo, cvv: value })
                }
                style={{
                  width: 120
                }}
              />
            </FlexView>
          </FormInputView>
          <FormInputView>
            <FormTextInput
              label="Full Name"
              value={fullName}
              onChangeText={value =>
                cardStore.setCardInfo({ ...cardInfo, fullName: value })
              }
              placeholder="Full Name"
            />
          </FormInputView>
        </FormWrapper>
        <FormInputView>
          <ServiceButton
            title={!isEditing ? "Save Card" : "Edit Card"}
            onPress={async () => {
              await this.saveCardHandler();
            }}
            loading={loading}
          />
        </FormInputView>
      </KeyboardAvoidingView>
    );
  }
}

export default AddCardScreen;
