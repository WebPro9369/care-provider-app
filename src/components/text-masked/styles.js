import styled from "styled-components/native";
import { TextInputMask } from "react-native-masked-text";
import { colors } from "../../utils/constants";

export const StyledMaskedTextInput = styled(TextInputMask)`
  width: ${props => props.width};
  height: ${props => props.height};
  color: ${props => props.color || colors.BLACK};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
`;

StyledMaskedTextInput.defaultProps = {
  width: "100%",
  height: 36,
  color: colors.BLACK,
  fontSize: 20,
  fontFamily: "Flama",
  lineHeight: 30,
  textAlign: "left",
  type: "custom",
  
};
