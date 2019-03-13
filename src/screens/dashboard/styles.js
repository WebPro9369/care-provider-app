import styled from "styled-components/native";
import { colors } from "../../utils/constants";

export const IllnessCard = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-end;
  width: 124px;
  height: 72px;
  border-radius: 8px;
  background-color: ${props => props.bgColor};
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 4px;
  margin-right: 8px;
`;

export const MatchingMessageWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: ${colors.LIGHTSKYBLUE};
`;

export const ContentWrapper = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
`;

ContentWrapper.defaultProps = {
  marginTop: 0,
  marginBottom: 0
};
