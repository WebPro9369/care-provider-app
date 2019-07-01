import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { Modal, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import {
  ModalWrapper,
  ViewCentered,
  View,
  FlexView
} from "../../../components/views";
import { StyledText } from "../../../components/text";
import { ModalButton } from "../../../components/modal-button";
import { colors } from "../../../utils/constants";

const imgAllergy = require("../../../../assets/images/AllergyImage.png");

@inject("store")
@observer
class ReviewAllergiesModalComponent extends Component {
  state = {
    modalVisible: false,
    readChecked: false,
    allergies: ''
  };

  static propTypes = {
    onAccept: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.modalVisible !== prevState.modalVisible) {
      return { modalVisible: nextProps.modalVisible, allergies: nextProps.allergies };
    }
    return null;
  }

  toggleReadChecked = () => {
    const { readChecked } = this.state;
    this.setState({ readChecked: !readChecked });
  };

  render() {
    const { modalVisible, readChecked } = this.state;
    const { onAccept } = this.props;

    if (!modalVisible) return null;
    const  { allergies } = this.state;

    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <ModalWrapper>
          <View style={{ paddingTop: 24 }}>
            <FlexView justifyContent="center">
              <StyledText
                fontSize={24}
                fontFamily="FlamaMedium"
                color={colors.BLACK87}
              >
                {"Review: "}
              </StyledText>
              <StyledText fontSize={24} color={colors.DARKRED}>
                Allergies
              </StyledText>
            </FlexView>
            <ViewCentered paddingBottom={20} style={{ marginTop: 80 }}>
              <Image source={imgAllergy} style={{ width: 120, height: 120 }} />
              <View style={{ marginTop: 32 }}>
                <StyledText color={colors.BLACK87}>
                  {allergies}
                </StyledText>
              </View>
              <View style={{ marginTop: 60 }}>
                <CheckBox
                  center
                  title="I have read and understand"
                  iconType="material"
                  checked={readChecked}
                  checkedIcon="check-box"
                  checkedColor={colors.SEAFOAMBLUE}
                  uncheckedIcon="check-box-outline-blank"
                  uncheckedColor={colors.SEAFOAMBLUE}
                  onPress={this.toggleReadChecked}
                  containerStyle={{
                    backgroundColor: colors.WHITE,
                    borderWidth: 0
                  }}
                />
              </View>
            </ViewCentered>
          </View>
          <FlexView>
            <ModalButton
              label="Confirm"
              pos="full"
              onPress={onAccept}
              disabled={!readChecked}
            />
          </FlexView>
        </ModalWrapper>
      </Modal>
    );
  }
}

export default ReviewAllergiesModalComponent;
