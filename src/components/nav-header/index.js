import React from "react";
import PropTypes from "prop-types";

import {
  Wrapper,
  StyledBackButtonIcon,
  StyledTouchableButtonWrapper,
  ServiceText
} from "./styles";

export const NavHeader = ({
  title,
  size,
  hasBackButton,
  backButtonIcon,
  onPressBackButton,
  ...rest
}) => (
  <Wrapper size={size} {...rest}>
    {hasBackButton ? (
      <StyledTouchableButtonWrapper onPress={onPressBackButton}>
        <StyledBackButtonIcon />
      </StyledTouchableButtonWrapper>
    ) : null}
    <ServiceText size={size}>{title}</ServiceText>
  </Wrapper>
);

NavHeader.propTypes = {
  title: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  hasBackButton: PropTypes.bool,
  backButtonIcon: PropTypes.element,
  onPressBackButton: PropTypes.func
};

NavHeader.defaultProps = {
  title: "",
  size: "small",
  hasBackButton: false,
  backButtonIcon: null,
  onPressBackButton: null
};

NavHeader.propTypes = {};
