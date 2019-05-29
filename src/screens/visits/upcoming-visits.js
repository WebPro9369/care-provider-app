import React from "react";
import { withNavigation } from "react-navigation";
import { inject, observer, PropTypes } from "mobx-react";
import { StyledText } from "@components/text";
import { ContainerView, View, ContentWrapper } from "@components/views";
import { ScrollView } from "@components/views/scroll-view";
import { VisitDetailCard } from "@components/cards";
import { colors } from "@utils/constants";
import { formatAMPM  } from "@utils/helpers";
import { getVisits } from "@services/opear-api";


const imgFox = require("../../../assets/images/Fox.png");
const imgDog = require("../../../assets/images/Dog.png");
const imgTiger = require("../../../assets/images/Tiger.png");


@inject("store")
@observer
class UpcomingVisitsScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };
  
  constructor(props ){
    super(props);

    this.state = {
      visits: []
    };
  }

  componentDidMount() {
    const { store: { currentUserStore: { id }}} = this.props;

    getVisits(id, {
      successHandler: (res) => {
        const visits = res.data.map(visitData => {
          const { 
            id, 
            reason: illness,
            appointment_time: appointmentTime,
            address: {
              city,
              state,
            },
            child: {
              first_name: childFirstName,
              last_name: childLastName,
            }
          } = visitData;

          return {
            key: id,
            id,
            avatarImg: [imgDog, imgTiger, imgFox][Math.floor(Math.random() * 3)], // TODO: add actual avatar
            name: `${childFirstName} ${childLastName}`,
            illness,
            time: formatAMPM(new Date(appointmentTime)),
            address: `${city}, ${state}`,
            color: "#f9b44d"
          }
        });

        this.setState({ visits })
      }
    });
  }

  render() {
    const { visits } = this.state;
    const {
      navigation: { navigate }
    } = this.props;

    return (
      <ContainerView style={{ marginTop: 0 }}>
        <ScrollView padding={0}>
          <View style={{ paddingTop: 24 }}>
            <ContentWrapper>
              <StyledText fontSize={16} color={colors.BLACK60}>
                Today
              </StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {visits.map(item => (
                  <View key={item.key} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                      onPress={() => navigate("VisitsVisitDetails", {
                        visitID: item.id
                      })}
                    />
                  </View>
                ))}
              </View>
            </ContentWrapper>
          </View>
          <View>
            <ContentWrapper>
              <StyledText>Jan 9</StyledText>
              <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                {visits.map(item => (
                  <View key={item.key} style={{ marginBottom: 9 }}>
                    <VisitDetailCard
                      avatarImg={item.avatarImg}
                      name={item.name}
                      illness={item.illness}
                      time={item.time}
                      address={item.address}
                      onPress={() => navigate("VisitsVisitDetails", {
                        visitID: item.id
                      })}
                    />
                  </View>
                ))}
              </View>
            </ContentWrapper>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default withNavigation(UpcomingVisitsScreen);
