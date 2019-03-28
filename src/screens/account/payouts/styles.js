import styled from "styled-components/native";
import { colors } from "../../../utils/constants";

export const TouchableWrapper = styled.TouchableOpacity`
  width: auto;
`;

export const ListTouchableButtonWrapper = styled.TouchableOpacity`
  background-color: ${colors.WHITE};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: auto;
  padding: 24px;
  margin-bottom: 12px;
  border: 0.5px solid rgba(0, 0, 0, 0.38);
  border-radius: 5px;
`;

export const ListButtonText = styled.Text`
  font-size: 20px;
  line-height: 24px;
`;
