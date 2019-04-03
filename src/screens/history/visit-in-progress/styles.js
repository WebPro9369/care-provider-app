import styled from "styled-components/native";
import { colors } from "../../../utils/constants";

export const IllnessContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  background-color: ${colors.DARKRED};
`;

export const TextBox = styled.TextInput`
  height: 320px;
  padding: 20px;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.BLACK};
  border-width: 1px;
  border-color: ${colors.BLACK38};
  border-radius: 6px;
`;
