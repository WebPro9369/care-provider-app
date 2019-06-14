import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const Wrapper = styled.View`
  width: auto;
  height: 56px;
`;

export const ServiceTouchableButtonWrapper = styled.TouchableOpacity`
  background-color: ${props =>
    props.grey ? "transparent" : props.backgroundColor || colors.LIGHTGREEN};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 13px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props => (props.grey ? colors.BLACK38 : colors.LIGHTGREEN)};
`;

export const ServiceText = styled.Text`
  color: ${props => props.color || colors.WHITE};
  font-family: "FlamaMedium";
  font-size: 20px;
  text-align: center;
`;
