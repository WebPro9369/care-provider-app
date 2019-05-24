import styled from "styled-components/native";
import { colors } from "../../utils/constants";

const imgBackIcon = require("../../../assets/images/Back.png");

export const Wrapper = styled.View`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${props => (props.size === "small" ? "12px" : "24px")};
  padding-bottom: ${props => (props.size === "small" ? "12px" : "24px")};
`;

export const StyledTouchableButtonWrapper = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor || colors.WHITE};
  height: 24px;
  padding-top: 4px;
  padding-bottom: 4px;
  min-width: 30px;
`;

export const ServiceText = styled.Text`
  color: ${props => props.color || colors.BLACK};
  font-family: "FlamaMedium";
  text-align: left;
  font-size: ${props => (props.size === "small" ? "20px" : "28px")};
  line-height: ${props => (props.size === "large" ? "40px" : "30px")};
`;

export const StyledBackButtonIcon = styled.Image`
  width: 25px;
  height: 16px;
  margin-right: 12px;
`;

StyledBackButtonIcon.defaultProps = {
  source: imgBackIcon
};
