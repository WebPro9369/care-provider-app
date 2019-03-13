import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants";

export const FlexViewSpread = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.BADGE_BACKGROUND,
    height: 28,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 15
  },
  badgeText: {
    color: colors.BADGE_TEXT_GREY,
    fontSize: 11
  }
});
