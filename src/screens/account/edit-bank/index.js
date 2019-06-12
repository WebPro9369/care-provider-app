import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import stripe from "tipsi-stripe";
import { inject, observer } from "mobx-react";
import { FormTextInput } from "../../../components/text";
import { NavHeader } from "../../../components/nav-header";
import { ServiceButton } from "../../../components/service-button";
import { FormWrapper } from "../../../components/views";
import {
  KeyboardAvoidingView,
  FormInputView
} from "../../../components/views/keyboard-view";
import { colors } from "../../../utils/constants";
import { createBankAccountProvider } from "../../../services/opear-api";

const { BLUE } = colors;

@inject("store")
@observer
class EditBankScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: "",
      routingNumber: "",
      loading: false
    };
  }

  saveBankHandler = async () => {
    const {
      navigation: { goBack },
      store: {
        providerStore: { onboardingData },
        currentUserStore
      }
    } = this.props;
    const { id } = currentUserStore;
    const { accountNumber, routingNumber } = this.state;

    const params = {
      accountNumber,
      routingNumber,
      countryCode: "us",
      currency: "usd",
      accountHolderType: "individual",
      accountHolderName: `${currentUserStore.first_name} ${currentUserStore.last_name}`
    };
    this.setState({ loading: true });
    try {
      const token = await stripe.createTokenWithBankAccount(params);
      onboardingData.setBankToken(token.tokenId);

      createBankAccountProvider(
        id,
        {
          payout_account: {
            token_id: token.tokenId
          }
        },
        res => {
          currentUserStore.setPayoutAccount(res.data.payout_account);
          this.setState({ loading: false });

          goBack();
        },
        () => {
          this.setState({ loading: false });
        }
      );
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    const { accountNumber, routingNumber, loading } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <NavHeader
          title="Edit bank"
          size="medium"
          hasBackButton
          onPressBackButton={() => goBack()}
        />
        <FormWrapper>
          <FormInputView>
            <FormTextInput
              label="Routing Number"
              placeholder="110000000"
              value={routingNumber}
              onChangeText={value => this.setState({ routingNumber: value })}
            />
          </FormInputView>
          <FormInputView>
            <FormTextInput
              label="Account Number"
              leftIcon={<FontAwesome name="bank" size={30} color={BLUE} />}
              placeholder="000123456789"
              value={accountNumber}
              onChangeText={value => this.setState({ accountNumber: value })}
            />
          </FormInputView>
        </FormWrapper>
        <ServiceButton
          title="Save Bank"
          onPress={async () => {
            await this.saveBankHandler();
          }}
          loading={loading}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default EditBankScreen;
