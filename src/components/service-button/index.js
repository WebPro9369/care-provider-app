import React from "react";
import PropTypes from "prop-types";
import { Wrapper, ServiceTouchableButtonWrapper, ServiceText } from "./styles";

export const ServiceButton = ({ title, icon, onPress, ...rest }) => (
  <Wrapper {...rest}>
    <ServiceTouchableButtonWrapper onPress={onPress}>
      <ServiceText>{title}</ServiceText>
    </ServiceTouchableButtonWrapper>
  </Wrapper>
);

ServiceButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onPress: PropTypes.func.isRequired
};

ServiceButton.defaultProps = {
  icon: null
};

ServiceButton.propTypes = {};
