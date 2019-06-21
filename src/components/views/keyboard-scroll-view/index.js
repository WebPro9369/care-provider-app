import React from "react";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const KeyboardScrollView = ({ padding, ...rest }) => (
  <KeyboardAwareScrollView style={{ flex: 1, padding }} {...rest} />
);

KeyboardScrollView.propTypes = {
  padding: PropTypes.number,
  extraScrollHeight: PropTypes.number,
  enableResetScrollToCoords: PropTypes.bool
};

KeyboardScrollView.defaultProps = {
  padding: 15,
  extraScrollHeight: 45,
  enableResetScrollToCoords: false
};
