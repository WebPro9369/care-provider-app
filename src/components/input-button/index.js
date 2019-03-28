import React from "react";
import PropTypes from "prop-types";
import { Wrapper, TouchableButtonWrapper, ServiceText, Label } from "./styles";

export const InputButton = ({ label, value, icon, onPress, ...rest }) => (
  <Wrapper {...rest}>
    <Label>{label}</Label>
    <TouchableButtonWrapper onPress={onPress}>
      <ServiceText>{value}</ServiceText>
      {icon}
    </TouchableButtonWrapper>
  </Wrapper>
);

InputButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onPress: PropTypes.func.isRequired
};

InputButton.defaultProps = {
  icon: null
};
