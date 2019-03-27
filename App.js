import React from "react";
import { Provider, observer } from "mobx-react";
import { mainStore } from "./src/store";
import RootContainer from "./src/root-container";

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // eslint-disable-next-line no-undef
    if (__DEV__) {
      import("./ReactotronConfig").then(() =>
        // eslint-disable-next-line no-console
        console.log("Reactotron Configured")
      );
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUpdate() {}

  componentWillUnmount() {}

  // eslint-disable-next-line class-methods-use-this
  onStartAsync() {
    setTimeout(() => {
      mainStore.applicationStore.hideSplash();
    }, 5000);
  }

  render() {
    // if (mainStore.applicationStore.getSplashShowing() === false) {
    return (
      <Provider store={mainStore}>
        <RootContainer />
      </Provider>
    );
  }
}
