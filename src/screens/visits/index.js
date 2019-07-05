/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unused-state */
import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import Animated from "react-native-reanimated";
import { TabView, SceneMap } from "react-native-tab-view";
import { StyledText } from "@components/text";
import { View, FlexView } from "@components/views";
import { colors } from "@utils/constants";
import { getVisits } from "@services/opear-api";
import { tabViewStyles, TabItem } from "./styles";
import UpcomingVisitsScreen from "./upcoming-visits";
import PastVisitsScreen from "./past-visits";
import { getAge } from "../../utils/helpers";

const FirstRoute = () => <UpcomingVisitsScreen />;
const SecondRoute = () => <PastVisitsScreen />;

@inject("store")
@observer
class ManageVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

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

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", route => {
      console.tron.log("Provider visits screen will focus: ", route);
      getVisits({ successHandler: this.handleFetchedVisits });
    });
  }

  handleFetchedVisits = res => {
    const {
      store: { visitsStore }
    } = this.props;
    const { data } = res;

    if (!data || typeof data !== "object") {
      console.tron.log("Invalid data: ", data);
      return false;
    }

    visitsStore.setVisits(Object.values(data).flat());
    return true;
  };

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
