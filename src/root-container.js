import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";
import stripe from "tipsi-stripe";
import AppNavigationContainer from "./navigation/main.navigator";
import { colors } from "./utils/constants";

stripe.setOptions({
  publishableKey: "pk_test_icZtWoaCwbJCemzBqBdTV6Cb", // test key
  // publishableKey: "pk_live_2YK7fEg9qnlrawyTukjyVUs9', // live key
  androidPayMode: "test" // "production"
});

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
