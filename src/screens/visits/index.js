/* eslint-disable react/no-unused-state */
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import Animated from "react-native-reanimated";
import { TabView, SceneMap } from "react-native-tab-view";
import { tabViewStyles, TabItem } from "./styles";
import UpcomingVisitsScreen from "./upcoming-visits";
import PastVisitsScreen from "./past-visits";
import { StyledText } from "@components/text";
import { View, FlexView } from "@components/views";
import { colors } from "@utils/constants";

const FirstRoute = () => <UpcomingVisitsScreen />;
const SecondRoute = () => <PastVisitsScreen />;

class ManageVisitsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "upcoming", title: "UPCOMING" },
        { key: "past", title: "PAST" }
      ]
    };
  }

  renderTabBar = props => {
    const { index } = this.state;
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={tabViewStyles.tabBar}>
        <View style={{ paddingTop: 24, paddingBottom: 16, paddingLeft: 16 }}>
          <StyledText fontSize={28} fontFamily="FlamaMedium" lineHeight={36}>
            {index === 0 ? "Upcoming Visits" : "Past Visits"}
          </StyledText>
        </View>
        <FlexView>
          {props.navigationState.routes.map((route, i) => {
            const color = Animated.color(
              35,
              140,
              Animated.round(
                Animated.interpolate(props.position, {
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 229 : 0
                  )
                })
              )
            );
            const active = index === i;

            return (
              <TabItem
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                active={active}
                onPress={() => this.setState({ index: i })}
              >
                <Animated.Text
                  style={{
                    color: active ? color : colors.MIDGREY,
                    fontSize: 14,
                    fontFamily: active ? "FlamaMedium" : "Flama"
                  }}
                >
                  {route.title}
                </Animated.Text>
              </TabItem>
            );
          })}
        </FlexView>
      </View>
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          upcoming: FirstRoute,
          past: SecondRoute
        })}
        renderTabBar={this.renderTabBar}
        onIndexChange={index => this.setState({ index })}
        // initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

export default ManageVisitsScreen;
