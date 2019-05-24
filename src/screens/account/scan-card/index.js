import React, { Component } from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { CardIOView, CardIOUtilities } from "react-native-awesome-card-io";
import { ContainerView, HeaderWrapper } from "../../../components/views";
import { NavHeader } from "../../../components/nav-header";

@inject("store")
@observer
class ScanCardComponent extends Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    CardIOUtilities.preload();
  }

  didScanCard = card => {
    // the scanned card
    console.tron.log("Card scanned: ", card);
    const {
      navigation,
      store: { userStore }
    } = this.props;
    userStore.setCardInfo(card);
    navigation.goBack();
  };

  render() {
    const {
      navigation: { goBack }
    } = this.props;
    return (
      <ContainerView>
        <HeaderWrapper>
          <NavHeader
            title="Scan your card"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper>
        <CardIOView didScanCard={this.didScanCard} style={{ flex: 1 }} />
      </ContainerView>
    );
  }
}

export default ScanCardComponent;
