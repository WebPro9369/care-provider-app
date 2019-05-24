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
  serviceTextStyle,
  hasBackButton,
  backButtonIcon,
  backgroundColor,
  onPressBackButton,
  ...rest
}) => (
  <Wrapper size={size} {...rest}>
    {hasBackButton ? (
      <StyledTouchableButtonWrapper
        backgroundColor={backgroundColor}
        onPress={onPressBackButton}
      >
        {backButtonIcon || <StyledBackButtonIcon />}
      </StyledTouchableButtonWrapper>
    ) : null}
    <ServiceText size={size} {...serviceTextStyle}>
      {title}
    </ServiceText>
  </Wrapper>
);

NavHeader.propTypes = {
  title: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  serviceTextStyle: PropTypes.instanceOf(Object),
  hasBackButton: PropTypes.bool,
  backButtonIcon: PropTypes.element,
  backgroundColor: PropTypes.string,
  onPressBackButton: PropTypes.func
};

NavHeader.defaultProps = {
  title: "",
  size: "small",
  serviceTextStyle: {},
  hasBackButton: false,
  backButtonIcon: null,
  backgroundColor: "#ffffff",
  onPressBackButton: null
};

NavHeader.propTypes = {};
