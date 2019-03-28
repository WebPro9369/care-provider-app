import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const Wrapper = styled.View`
  width: auto;
  height: 56px;
`;

export const TouchableButtonWrapper = styled.TouchableOpacity`
  background-color: ${colors.WHITE};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 9px;
  padding-bottom: 9px;
  border-style: solid;
  border-bottom-width: 0.5px;
  border-color: #000;
`;

export const Label = styled.Text`
  font-family: "FlamaMedium";
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

export const ServiceText = styled.Text`
  color: ${colors.BLACK};
  font-family: "Flama";
  font-size: 20px;
  line-height: 24px;
  text-align: left;
`;
