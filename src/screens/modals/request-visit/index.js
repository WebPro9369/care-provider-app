import React, { Component } from "react";
import ReactPropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Modal } from "react-native";
import MapView from "react-native-maps";
import { updateVisit } from "@services/opear-api";
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
import { GoogleMapsService } from "@services";

const imgDog = require("../../../../assets/images/Dog.png");

@inject("store")
@observer
class RequestVisitModalComponent extends Component {
  state = {
    visit: null,
    modalVisible: false,
    // TODO: Remove static map data
    distance: "3.8 miles away",
    region: null
  };

  static propTypes = {
    onAccept: ReactPropTypes.func.isRequired,
    onCancel: ReactPropTypes.func.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalVisible !== prevState.modalVisible) {
      return { modalVisible: nextProps.modalVisible, visit: nextProps.visit };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.state.visit && (!this.state.region || !this.state.region.loaded)) {
      this.getVisitGeoInfo();
    }
  }

  getVisitGeoInfo = () => {
    const { visit: { address } } = this.state;
    if (address) {
      GoogleMapsService.getGeo(
        `${address.street} ,${address.city}${
          address.state ? `, ${address.state}` : ""
        }`,
        innerRes => {
          const { data } = innerRes;
          if (data && data.results && data.results[0].geometry) {
            const { lat, lng } = data.results[0].geometry.location;
            this.setState({
              region: {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.09,
                loaded: true
              }
            });
          } else {
            this.setState({
              region: null
            });
          }
        },
        () => {
          this.setState({
            region: null
          });
        }
      );
    }
  }

  accept = () => {
    const { onAccept } = this.props;
    const {
      visit: { id }
    } = this.state;

    const successHandler = () => onAccept();
    // TODO: move this to a secure and specific endpoint like /visit/{id}/accept
    updateVisit(id, { state: "scheduled" }, { successHandler });
  };

  close = () => {
    const { onCancel } = this.props;
    const {
      visit: { id }
    } = this.state;

    const successHandler = () => onCancel();
    // TODO: move this to a secure and specific endpoint like /visit/{id}/cancel
    updateVisit(id, { state: 'pending' }, { successHandler });
  };

  render() {
    const { modalVisible, distance, region } = this.state;

    if (!modalVisible) return null;

    const {
      visit: { name, illness, symptoms, time, allergies, parentNotes, address, date }
    } = this.state;

    return (
      <Modal animationType="slide" transparent={false}>
        <ModalWrapper>
          <View>
            <ViewCentered paddingTop={16} paddingBottom={16}>
              <StyledText
                fontSize={24}
                fontFamily="FlamaMedium"
                color={colors.BLACK87}
              >
                {"Request: "}
                {illness}
              </StyledText>
              <StyledText fontSize={14} color={colors.MIDGREY}>
                {distance}
              </StyledText>
            </ViewCentered>
            {region && (
              <MapView
                style={{ alignSelf: "stretch", height: 160 }}
                initialRegion={region}
              />
            )}
            <View style={{ paddingTop: 32, paddingBottom: 16 }}>
              <VisitDetailCard
                avatarImg={imgDog}
                name={name}
                illness={illness}
                time={time}
                address={address}
              />
            </View>
            <ContentWrapper>
              <View style={{ marginTop: 8 }}>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="FlamaMedium">
                      Date
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>
                    {date ? date : "-"}
                  </StyledText>
                </FlexView>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="FlamaMedium">
                      Allergies
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>
                    {allergies ? allergies : "-"}
                  </StyledText>
                </FlexView>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="FlamaMedium">
                      Other
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>
                    {parentNotes ? parentNotes : "-"}
                  </StyledText>
                </FlexView>
                <FlexView
                  justifyContent="start"
                  style={{ paddingTop: 6, paddingBottom: 6 }}
                >
                  <View style={{ width: 100 }}>
                    <StyledText fontSize={14} fontFamily="FlamaMedium">
                      Visit Reason
                    </StyledText>
                  </View>
                  <StyledText fontSize={14}>
                    {symptoms.length ? symptoms.join(", ") : "-"}
                  </StyledText>
                </FlexView>
              </View>
            </ContentWrapper>
          </View>
          <FlexView>
            <ModalButton label="Accept" pos="left" onPress={this.accept} />
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
