/* eslint-disable no-return-assign */
import React from "react";
import PropTypes from "prop-types";
import { StyledText, Wrapper, FlexView, LeftFlexView } from "../text/styles";
import { StyledMaskedTextInput } from "./styles";

class FormMaskedTextInput extends React.Component {
  getInnerRef = () => this.refInput;

  render() {
    const {
      label,
      value,
      color,
      leftIcon,
      rightIcon,
      placeholder,
      type,
      ref,
      maskType,
      maskOptions,
      wrapperStyle,
      onChangeText,
      ...rest
    } = this.props;

    return (
      <Wrapper style={wrapperStyle}>
        <StyledText fontSize={14} lineHeight={18} color={color}>
          {label}
        </StyledText>
        <FlexView color={color}>
          <LeftFlexView>
            {leftIcon ? (
              <Wrapper style={{ marginRight: 16 }}>{leftIcon}</Wrapper>
            ) : null}
            <StyledMaskedTextInput
              placeholder={placeholder}
              placeholderTextColor={color}
              secureTextEntry={type === "password"}
              fontSize={20}
              lineHeight={24}
              value={value}
              color={color}
              type={maskType}
              options={maskOptions}
              ref={input => (this.refInput = input)}
              onChangeText={onChangeText}
              {...rest}
            />
          </LeftFlexView>
          {rightIcon}
        </FlexView>
      </Wrapper>
    );
  }
}

FormMaskedTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  placeholder: PropTypes.string,
  wrapperStyle: PropTypes.instanceOf(Object),
  onChangeText: PropTypes.func,
  maskType: PropTypes.string,
  maskOptions: PropTypes.element
};

FormMaskedTextInput.defaultProps = {
  label: "",
  value: null,
  color: null,
  type: "text",
  leftIcon: null,
  rightIcon: null,
  placeholder: "",
  wrapperStyle: null,
  onChangeText: () => {},
  maskType: "custom",
  maskOptions: { mask: "99/99/9999" }
};

export { StyledText, StyledMaskedTextInput, FormMaskedTextInput };
