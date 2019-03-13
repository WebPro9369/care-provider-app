import React from "react";
import PropTypes from "prop-types";
import { TouchableButtonWrapper, Label } from "./styles";

export const ModalButton = ({ label, pos, reversed, disabled, ...rest }) => (
  <TouchableButtonWrapper
    reversed={reversed}
    pos={pos}
    disabled={disabled}
    {...rest}
  >
    <Label reversed={reversed} disabled={disabled}>
      {label}
    </Label>
  </TouchableButtonWrapper>
);

ModalButton.propTypes = {
  label: PropTypes.string.isRequired,
  pos: PropTypes.string,
  reversed: PropTypes.bool,
  disabled: PropTypes.bool
};

ModalButton.defaultProps = {
  pos: null,
  reversed: false,
  disabled: false
};
