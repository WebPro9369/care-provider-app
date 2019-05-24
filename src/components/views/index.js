import styled from "styled-components/native";
import { colors } from "../../utils/constants";

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

export const ContentWrapper = styled.View`
  padding-left: ${props => props.paddingLeft};
  padding-right: ${props => props.paddingRight};
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
`;

ContentWrapper.defaultProps = {
  paddingLeft: 16,
  paddingRight: 16,
  marginTop: 0,
  marginBottom: 0
};

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
  justify-content: ${props => (props.centered ? "center" : "flex-start")};
  padding: ${props => `${props.padding}px`};
  padding-top: ${props => `${props.paddingTop}px`};
  padding-bottom: ${props => `${props.paddingBottom}px`};
`;

FormWrapper.defaultProps = {
  padding: 16,
  paddingTop: 16,
  paddingBottom: 40
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
  padding-top: ${props => `${props.paddingTop}px`};
  padding-bottom: ${props => `${props.paddingBottom}px`};
`;

ViewCentered.defaultProps = {
  paddingTop: 12,
  paddingBottom: 50
};

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

export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-top: ${props => `${props.marginTop}px`};
  margin-bottom: ${props => `${props.marginBottom}px`};
  margin-left: ${props => `${props.marginLeft}px`};
  margin-right: ${props => `${props.marginRight}px`};
  border-style: solid;
  border-radius: 16px;
  border-width: 0.5px;
  border-color: ${colors.BLACK38};
`;

ModalWrapper.defaultProps = {
  marginTop: 40,
  marginBottom: 40,
  marginLeft: 16,
  marginRight: 16
};
