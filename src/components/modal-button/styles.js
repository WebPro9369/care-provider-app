import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const Wrapper = styled.View`
  width: auto;
  height: 56px;
`;

export const TouchableButtonWrapper = styled.TouchableOpacity`
  height: 56px;
  flex: 1;
  background-color: ${props => {
    if (props.disabled) {
      return colors.BLACK38;
    }
    return props.reversed ? colors.WHITE : colors.SEAFOAMBLUE;
  }};
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: 1.5px;
  border-color: ${props =>
    props.disabled ? colors.BLACK38 : colors.SEAFOAMBLUE};
  border-bottom-left-radius: ${props =>
    props.pos === "left" || props.pos === "full" ? "16px" : 0};
  border-bottom-right-radius: ${props =>
    props.pos === "right" || props.pos === "full" ? "16px" : 0};
`;

export const Label = styled.Text`
  font-family: "FlamaMedium";
  font-size: 20px;
  color: ${props => (props.reversed ? colors.SEAFOAMBLUE : colors.WHITE)};
`;
