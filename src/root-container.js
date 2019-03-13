import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";
import AppNavigationContainer from "./navigation/main.navigator";
import { colors } from "./utils/constants";

const Root = styled.View`
  flex: 1;
  background-color: ${props => props.theme.WHITE};
`;

const RootContainer = () => (
  <ThemeProvider theme={colors}>
    <Root>
      <StatusBar />
      <AppNavigationContainer />
    </Root>
  </ThemeProvider>
);

export default RootContainer;
