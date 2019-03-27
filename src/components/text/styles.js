import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const WrapperView = styled.View`
  flex: 1;
`;

export const Wrapper = styled.View`
  display: flex;
`;

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-color: ${colors.BLACK};
`;

export const LeftFlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledText = styled.Text`
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
`;

StyledText.defaultProps = {
  color: colors.BLACK,
  fontSize: 20,
  fontFamily: "Flama",
  lineHeight: 30,
  textAlign: "left"
};

export const StyledTextInput = styled.TextInput`
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  line-height: ${props => props.lineHeight};
  text-align: ${props => props.textAlign};
`;

StyledTextInput.defaultProps = {
  color: colors.BLACK,
  fontSize: 20,
  fontFamily: "Flama",
  lineHeight: 30,
  textAlign: "left"
};
