import styled from "styled-components/native";

export const View = styled.View`
  padding-top: 24px;
  padding-bottom: 24px;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
  padding: ${props => `${props.padding}px`};
`;

ScrollView.defaultProps = {
  padding: 16
};
