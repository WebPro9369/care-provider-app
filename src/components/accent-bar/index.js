/* eslint-disable no-return-assign */
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

class AccentBar extends React.Component {

  render() {
    const {
      height,
      backgroundColor
    } = this.props;

    return (
      <View style={{height:this.props.height}}>
        <View style={{flex:1, backgroundColor:this.props.backgroundColor}} />
      </View>
    );
  }
};

AccentBar.propTypes = {
  height: PropTypes.number
};

AccentBar.defaultProps = {
  height: 115,
  backgroundColor: "#76DB94"
};

export { AccentBar };
