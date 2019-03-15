import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants";

export const ProviderCardWrapper = styled.TouchableOpacity`
  padding: 16px;
  border-style: solid;
  border-width: 0.5px;
  border-color: ${colors.BLACK38};
  border-radius: 12px;
`;

export const BookedDetailCardWrapper = styled.TouchableOpacity`
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CardContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProviderStarsCardWrapper = styled.View`
  padding: 16px;
  border-style: solid;
  border-width: 0.5px;
  border-color: ${colors.BLACK38};
  border-radius: 12px;
`;

export const VisitDetailCardWrapper = styled.TouchableOpacity`
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-style: solid;
  border-width: 0.5px;
  border-color: ${colors.MIDGREY};
  border-radius: 8px;
`;

export const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.BADGE_BACKGROUND,
    height: 28,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 15
  },
  badgeText: {
    color: colors.BLACK60,
    fontSize: 11,
    fontFamily: "Flama-Medium"
  }
});
