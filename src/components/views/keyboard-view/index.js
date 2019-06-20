import styled from "styled-components/native";
import { Platform } from "react-native";

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: ${props =>
    props.startFromTop ? "flex-start" : "space-between"};
  padding: ${props => `${props.padding}px`};
  padding-bottom: 30px;
`;

KeyboardAvoidingView.defaultProps = {
  startFromTop: false,
  padding: 16,
  behavior: Platform.OS === "ios" ? "padding" : null
};

export const FormInputView = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
`;
