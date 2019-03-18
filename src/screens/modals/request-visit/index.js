import React, { Component } from "react";
import ReactPropTypes from "prop-types";
import { inject, observer, PropTypes } from "mobx-react";
import { Modal, Alert } from "react-native";
import { MapView } from "expo";
import {
  ModalWrapper,
  ViewCentered,
  ContentWrapper,
  View,
  FlexView
} from "../../../components/views";
import { StyledText } from "../../../components/text";
import { VisitDetailCard } from "../../../components/cards";
import { ModalButton } from "../../../components/modal-button";
import { colors } from "../../../utils/constants";

const imgDog = require("../../../../assets/images/Dog.png");

@inject("store")
@observer
class RequestVisitModalComponent extends Component {
  state = {
    modalVisible: false,
    illness: "Flu Shot",
    distance: "3.8 miles away",
    address: "22341 Justice Ave #24",
    childname: "Benjamin",
    time: "6PM",
    allergies: "Crustaceans, gluten",
    other: "Benjamin wears contact lenses",
    visitReason: "Precautionary",
    map: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  static propTypes = {
    onAccept: ReactPropTypes.func.isRequired,
    store: PropTypes.observableObject.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalVisible !== prevState.modalVisible) {
      return { modalVisible: nextProps.modalVisible };
    }
    return null;
  }

  componentDidUpdate() {
    // const { modalVisible } = this.props;
    // if (prevProps.modalVisible !== modalVisible) {
    //   this.setState({ modalVisible });
    // }
  }

  setModalVisible = visible => {
    const { store } = this.props;
    this.setState({ modalVisible: visible });
    store.applicationStore.setAppointment(visible);
  };

  close = () => {
    this.setModalVisible(false);
  };

  render() {
    const {
      modalVisible,
      childname,
      illness,
      distance,
      address,
      time,
      allergies,
      other,
      visitReason,
      map
    } = this.state;
    const { onAccept } = this.props;
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <ModalWrapper>
          <View>
            <ViewCentered paddingTop={16} paddingBottom={16}>
              <StyledText
                fontSize={24}
                fontFamily="Flama-Medium"
                color={colors.BLACK87}
              >
                {"Request: "}
                {illness}
              </StyledText>
              <StyledText fontSize={14} color={colors.MIDGREY}>
                {distance}
              </StyledText>
            </ViewCentered>
            <MapView
              style={{ alignSelf: "stretch", height: 160 }}
              initialRegion={map}
            />
            <View style={{ paddingTop: 32, paddingBottom: 16 }}>
              <VisitDetailCard
                avatarImg={imgDog}
                name={childname}
                illness={illness}
                time={time}
                address=""
              />
            </View>
            <ContentWrapper>
              <View style={{ marginTop: 8 }}>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="Flama-Medium">
                      Allergies
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>{allergies}</StyledText>
                </FlexView>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="Flama-Medium">
                      Other
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>{other}</StyledText>
                </FlexView>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="Flama-Medium">
                      Visit Reason
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>{visitReason}</StyledText>
                </FlexView>
              </View>
            </ContentWrapper>
          </View>
          <FlexView>
            <ModalButton label="Accept" pos="left" onPress={onAccept} />
            <ModalButton
              label="Decline"
              pos="right"
              reversed
              onPress={this.close}
            />
          </FlexView>
        </ModalWrapper>
      </Modal>
    );
  }
}

export default RequestVisitModalComponent;
