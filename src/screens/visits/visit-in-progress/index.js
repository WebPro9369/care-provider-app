import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
import MapView from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavHeader } from "../../../components/nav-header";
import {
  LargeBookedDetailCard,
  VisitDetailCard
} from "../../../components/cards";
import { ServiceButton } from "../../../components/service-button";
import {
  ContainerView,
  HeaderWrapper,
  View,
  ViewCentered
} from "../../../components/views";
import { ScrollView } from "../../../components/views/scroll-view";
import { colors } from "../../../utils/constants";
import { StyledText } from "../../../components/text";
import { IllnessContainer, TextBox } from "./styles";

const imgDog = require("../../../../assets/images/Dog.png");

@inject("store")
@observer
class VisitInProgressScreen extends React.Component {
  static propTypes = {
    store: PropTypes.observableObject.isRequired
  };

  state = {
    child: {
      key: "1",
      avatarImg: imgDog,
      name: "Benjamin",
      illness: "Flu Shot",
      time: "6PM",
      address: "Bushwick, NY",
      color: "#f9b44d"
    },
    parentName: "Michael Smith",
    visitReason: "Precautionary",
    allergies: "Crustaceans, gluten",
    parentNotes: "Benjamin wears contact lenses",
    visitNotes: "Tommy is doing well"
  };

  render() {
    const {
      navigation: { goBack, navigate },
      store: { providerStore }
    } = this.props;
    const { arrived } = providerStore;
    const {
      child,
      parentName,
      visitReason,
      allergies,
      parentNotes,
      visitNotes
    } = this.state;
    return (
      <ContainerView>
        {/* <HeaderWrapper>
          <NavHeader
            title="Visit Details"
            size="medium"
            hasBackButton
            onPressBackButton={() => goBack()}
          />
        </HeaderWrapper> */}
        <ViewCentered paddingTop={44} paddingBottom={20}>
          <StyledText
            fontSize={24}
            fontFamily="FlamaMedium"
            color={colors.BLACK}
          >
            Visit In Progress
          </StyledText>
        </ViewCentered>
        <ScrollView padding={0}>
          <IllnessContainer>
            <StyledText fontSize={16} color={colors.WHITE}>
              Allergies: Crustaceans, gluten, crustaceans, gluten
            </StyledText>
          </IllnessContainer>
          <View style={{ padding: 16, marginTop: 16 }}>
            <VisitDetailCard
              avatarImg={child.avatarImg}
              name={child.name}
              illness={child.illness}
              time={child.time}
              address={child.address}
            />
            <View style={{ marginTop: 32 }}>
              <LargeBookedDetailCard
                type="Parent Name"
                text={parentName}
                icon={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <FontAwesome
                    name="phone"
                    size={36}
                    style={{
                      backgroundColor: "transparent",
                      color: colors.DARKSKYBLUE
                    }}
                  />
                }
              />
              <LargeBookedDetailCard type="Visit Reason" text={visitReason} />
              <LargeBookedDetailCard type="Allergies" text={allergies} />
              <LargeBookedDetailCard type="Parent Notes" text={parentNotes} />
            </View>
          </View>
          <View style={{ marginTop: 20, padding: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <StyledText
                fontSize={14}
                fontFamily="FlamaMedium"
                color={colors.BLACK60}
              >
                Visit Notes
              </StyledText>
            </View>
            <TextBox editable multiline value={visitNotes} />
          </View>
          <View style={{ marginTop: 48, paddingLeft: 16, paddingRight: 16 }}>
            <View style={{ paddingTop: 6, paddingBottom: 6 }}>
              <ServiceButton title="Complete Visit" />
            </View>
            <View style={{ paddingTop: 6, paddingBottom: 6 }}>
              <ServiceButton
                grey
                title="Contact Support"
                onPress={() => goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </ContainerView>
    );
  }
}

export default VisitInProgressScreen;
