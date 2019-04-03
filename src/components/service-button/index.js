import React from "react";
import PropTypes from "prop-types";
import { Wrapper, ServiceTouchableButtonWrapper, ServiceText } from "./styles";
import { colors } from "../../utils/constants";

export const ServiceButton = ({ grey, title, icon, onPress, ...rest }) => (
  <Wrapper {...rest}>
    <ServiceTouchableButtonWrapper grey={grey} onPress={onPress}>
      <ServiceText color={grey ? colors.BLACK38 : colors.WHITE}>
        {title}
      </ServiceText>
    </ServiceTouchableButtonWrapper>
  </Wrapper>
);

ServiceButton.propTypes = {
  grey: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  onPress: PropTypes.func.isRequired
};

ServiceButton.defaultProps = {
  grey: false,
  icon: null
};

ServiceButton.propTypes = {};
