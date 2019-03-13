import styled from "styled-components/native";

export const ContainerView = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: ${props => `${props.padding}px`};
`;

ContainerView.defaultProps = {
  padding: 0
};

export const View = styled.View`
  justify-content: flex-start;
`;

export const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: ${props => {
    if (props.justifyContent === "center") return "center";
    if (props.justifyContent === "start") return "flex-start";
    if (props.justifyContent === "end") return "flex-end";
    return "space-between";
  }};
  align-items: ${props => props.alignItems || "center"};
`;

export const FormWrapper = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: ${props => `${props.padding}px`};
  padding-bottom: 40px;
`;

FormWrapper.defaultProps = {
  padding: 16
};

export const FormInputWrapper = styled.View`
  padding-top: ${props => `${props.paddingTop}px`};
  padding-bottom: ${props => `${props.paddingBottom}px`};
  padding-left: ${props => `${props.paddingLeft}px`};
  padding-right: ${props => `${props.paddingRight}px`};
`;

FormInputWrapper.defaultProps = {
  paddingTop: 24,
  paddingBottom: 24,
  paddingLeft: 0,
  paddingRight: 0
};

export const HeaderWrapper = styled.View`
  padding: 16px;
`;

export const ViewCentered = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 50px;
`;

export const TouchableView = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: ${props => {
    if (props.justifyContent === "center") return "center";
    if (props.justifyContent === "start") return "flex-start";
    if (props.justifyContent === "end") return "flex-end";
    return "space-between";
  }};
  align-items: ${props => props.alignItems || "center"};
`;
