import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, FlexView } from "../views";
import { StyledText } from "../text";
import { colors } from "../../utils/constants";

const timeSlotStrs = [
  "12am",
  "12:30am",
  "1am",
  "1:30am",
  "2am",
  "2:30am",
  "3am",
  "3:30am",
  "4am",
  "4:30am",
  "5am",
  "5:30am",
  "6am",
  "6:30am",
  "7am",
  "7:30am",
  "8am",
  "8:30am",
  "9am",
  "9:30am",
  "10am",
  "10:30am",
  "11am",
  "11:30am",
  "12pm",
  "12:30pm",
  "1pm",
  "1:30pm",
  "2pm",
  "2:30pm",
  "3pm",
  "3:30pm",
  "4pm",
  "4:30pm",
  "5pm",
  "5:30pm",
  "6pm",
  "6:30pm",
  "7pm",
  "7:30pm",
  "8pm",
  "8:30pm",
  "9pm",
  "9:30pm",
  "10pm",
  "10:30pm",
  "11pm",
  "11:30pm"
];

export const SliderMarker = ({ currentValue, disabled }) => {
  // console.tron.log("Custom marker props: ", rest);
  let viewWidth = null;

  if(timeSlotStrs[currentValue].length >= 7) {
    viewWidth = 65;
  }

  return (
    <View
      style={{ paddingTop: disabled ? 0 : 16, backgroundColor: "transparent", width: viewWidth }}
    >
      <FlexView justifyContent="center">
        <FontAwesome
          name="circle-o"
          size={16}
          color={disabled ? colors.BLACK38 : colors.DARKSKYBLUE}
          style={{ backgroundColor: colors.WHITE, maxWidth: 16 }}
        />
      </FlexView>
      {!disabled ? (
          <StyledText fontSize={14} lineHeight={18} color={colors.BLACK87}>
            {timeSlotStrs[currentValue]}
          </StyledText>
      ) : null}
    </View>
  );
};

SliderMarker.propTypes = {
  currentValue: PropTypes.number,
  disabled: PropTypes.bool
};

SliderMarker.defaultProps = {
  currentValue: 0,
  disabled: false
};
