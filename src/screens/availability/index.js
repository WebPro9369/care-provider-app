/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-destructuring */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import { FlatList, Switch, DatePickerIOS, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { StyledText } from "@components/text";
import {
  ContainerView,
  View,
  FlexView,
  TouchableView
} from "@components/views";
import { SliderMarker } from "@components/slider-marker";
import { ServiceButton } from "@components/service-button";
import { WEEKDAYS, colors } from "@utils/constants";
import { getAvailabilities, updateAvailabilities } from "@services/opear-api";

@inject("store")
@observer
class AvailabilityScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      snoozed: false,
      sameEveryDay: false,
      sliderOneChanging: false,
      sliderOneValue: [0],
      timeSlots: [],
      showDateTimePicker: false,
      chosenDate: new Date()
    };
  }

  componentDidMount() {
    const {
      store: {
        currentUserStore: { id: userID }
      }
    } = this.props;

    const successHandler = res => {
      const { available_days: availableDays } = res.data;

      const timeSlots = availableDays.map(entry => {
        const {
          id,
          weekday: weekdayIndex,
          on,
          start_hour: startFloat,
          end_hour: endFloat
        } = entry;

        const { key, label } = WEEKDAYS[weekdayIndex];

        return {
          key,
          id,
          label,
          start: startFloat * 2,
          end: endFloat * 2,
          disabled: !on
        };
      });

      this.setState({ timeSlots });
    };

    getAvailabilities(userID, { successHandler });
  }

  setDate = newDate => {
    console.tron.log("Availability new date: ", newDate);
    this.setState({
      chosenDate: newDate
    });
  };

  showDateTimePicker = () => {
    this.setState({
      showDateTimePicker: true
    });
  };

  hideDateTimePicker = () => {
    this.setState({
      showDateTimePicker: false
    });
  };

  handleSetAvailability = () => {
    const {
      navigation: { navigate },
      store: {
        currentUserStore: { id: userID }
      }
    } = this.props;
    const { showDateTimePicker } = this.state;
    if (showDateTimePicker) {
      return this.hideDateTimePicker();
    }

    const {
      sameEveryDay: allSame,
      snoozed: snoozeNotifications,
      timeSlots
    } = this.state;

    const availableDays = timeSlots.map(slot => {
      const { id, disabled, start, end } = slot;

      return {
        id,
        on: !disabled,
        start_hour: start / 2,
        end_hour: end / 2
      };
    });

    const data = {
      availability: {
        allSame,
        snoozeNotifications,
        available_days_attributes: availableDays
      }
    };

    const successHandler = () => {
      navigate("TabDashboard");
    };

    return updateAvailabilities(userID, data, { successHandler });
  };

  onChangeSwitchSED = value => {
    if (!value) {
      return this.setState({
        sameEveryDay: value
      });
    }
    const { timeSlots } = this.state;
    const { start, end } = timeSlots[0];
    const newTimeSlots = timeSlots.map(t => ({
      ...t,
      start,
      end,
      disabled: false
    }));
    return this.setState({
      sameEveryDay: value,
      timeSlots: newTimeSlots
    });
  };

  onChangeSwitchSN = value => {
    this.setState({
      snoozed: value,
      showDateTimePicker: value
    });
  };

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true
    });
  };

  sliderOneValuesChange = values => {
    const newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues
    });
  };

  sliderOneValuesChangeFinish = (key, values) => {
    // console.tron.log("Slider values changed; ", key, values);
    const { sameEveryDay, timeSlots } = this.state;
    const newTimeSlots = timeSlots.map(t => {
      if (sameEveryDay) {
        return { ...t, start: values[0], end: values[1] };
      }
      if (t.key === key) {
        return {
          ...t,
          start: values[0],
          end: values[1]
        };
      }
      return t;
    });
    this.setState({
      timeSlots: newTimeSlots
    });
  };

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values
    });
  };

  toggleDisabled = key => {
    const { timeSlots } = this.state;
    const newTimeSlots = timeSlots.map(t => {
      if (t.key === key) {
        return {
          ...t,
          disabled: !t.disabled
        };
      }
      return t;
    });
    this.setState({
      timeSlots: newTimeSlots
    });
  };

  render() {
    const {
      snoozed,
      sameEveryDay,
      timeSlots,
      chosenDate,
      showDateTimePicker
    } = this.state;

    const screenWidth = Dimensions.get("window").width;
    const sliderWidth = screenWidth - 84 - 32;

    return (
      <ContainerView style={{ paddingTop: 16, paddingBottom: 16 }}>
        <View
          style={{
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 16,
            paddingRight: 16
          }}
        >
          <StyledText
            fontSize={28}
            fontFamily="FlamaMedium"
            lineHeight={30}
            color={colors.BLACK87}
          >
            Your availability
          </StyledText>
        </View>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <FlexView>
            <FlexView>
              <StyledText fontSize={14} color={colors.BLACK38}>
                Same every day
              </StyledText>
              <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                onValueChange={this.onChangeSwitchSED}
                value={sameEveryDay}
              />
            </FlexView>
            <FlexView>
              <StyledText fontSize={14} color={colors.BLACK38}>
                Snooze notifications
              </StyledText>
              <Switch
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                onValueChange={this.onChangeSwitchSN}
                value={snoozed}
              />
            </FlexView>
          </FlexView>
        </View>
        {showDateTimePicker && (
          <View
            style={{
              flex: 1,
              paddingTop: 32
            }}
          >
            <DatePickerIOS date={chosenDate} onDateChange={this.setDate} />
          </View>
        )}
        {!showDateTimePicker && (
          <View style={{ flex: 1, marginTop: 20, paddingLeft: 16 }}>
            <FlatList
              data={timeSlots}
              renderItem={({ item }) => (
                <View
                  style={{ marginTop: 12, marginBottom: 12, paddingRight: 12 }}
                >
                  <FlexView>
                    <TouchableView
                      justifyContent="center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: item.disabled
                          ? colors.BLACK38
                          : colors.DARKSKYBLUE
                      }}
                      onPress={() => this.toggleDisabled(item.key)}
                    >
                      <StyledText
                        fontSize={14}
                        fontFamily="FlamaMedium"
                        color={colors.WHITE}
                      >
                        {item.label}
                      </StyledText>
                    </TouchableView>
                    <View style={{ paddingLeft: 24, paddingRight: 12 }}>
                      <MultiSlider
                        values={[item.start, item.end]}
                        sliderLength={sliderWidth}
                        min={0}
                        max={47}
                        step={1}
                        enabledOne={!item.disabled}
                        enabledTwo={!item.disabled}
                        snapped
                        allowOverlap={false}
                        onValuesChangeStart={this.sliderOneValuesChangeStart}
                        onValuesChange={this.sliderOneValuesChange}
                        onValuesChangeFinish={values =>
                          this.sliderOneValuesChangeFinish(item.key, values)
                        }
                        customMarker={props => (
                          <SliderMarker disabled={item.disabled} {...props} />
                        )}
                      />
                    </View>
                  </FlexView>
                </View>
              )}
            />
          </View>
        )}
        <View
          style={{
            marginTop: 16,
            marginBottom: 12,
            paddingLeft: 16,
            paddingRight: 16
          }}
        >
          <ServiceButton
            title={showDateTimePicker ? "Set Date" : "Set Availability"}
            onPress={this.handleSetAvailability}
          />
        </View>
      </ContainerView>
    );
  }
}

export default AvailabilityScreen;
