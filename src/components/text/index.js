/* eslint-disable no-return-assign */
import React from "react";
import PropTypes from "prop-types";
import {
  StyledText,
  StyledTextInput,
  Wrapper,
  FlexView,
  LeftFlexView
} from "./styles";

class FormTextInput extends React.Component {
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
            <StyledTextInput
              placeholder={placeholder}
              placeholderTextColor={color}
              secureTextEntry={type === "password"}
              fontSize={20}
              lineHeight={24}
              value={value}
              color={color}
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

FormTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  placeholder: PropTypes.string,
  wrapperStyle: PropTypes.instanceOf(Object),
  onChangeText: PropTypes.func
};

FormTextInput.defaultProps = {
  label: "",
  value: null,
  color: null,
  type: "text",
  leftIcon: null,
  rightIcon: null,
  placeholder: "",
  wrapperStyle: null,
  onChangeText: () => {}
};

export { StyledText, StyledTextInput, FormTextInput };
