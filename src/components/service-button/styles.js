import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const Wrapper = styled.View`
  width: auto;
  height: 56px;
`;

export const ServiceTouchableButtonWrapper = styled.TouchableOpacity`
  background-color: ${colors.LIGHTGREEN};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 13px;
  border-radius: 5px;
`;

export const ServiceText = styled.Text`
  color: ${colors.WHITE};
  font-family: "FlamaMedium";
  font-size: 20px;
  line-height: 30px;
  text-align: center;
`;
