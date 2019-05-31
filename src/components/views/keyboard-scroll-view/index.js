import React from "react";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const KeyboardScrollView = ({ padding, ...rest }) => (
  <KeyboardAwareScrollView style={{ flex: 1, padding }} {...rest} />
);

KeyboardScrollView.propTypes = {
  padding: PropTypes.number,
  extraScrollHeight: PropTypes.number
};

KeyboardScrollView.defaultProps = {
  padding: 16,
  extraScrollHeight: 45
};
