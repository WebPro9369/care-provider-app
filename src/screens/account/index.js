import React from "react";
import { Avatar, Badge } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyledText } from "../../components/text";
import { NavHeader } from "../../components/nav-header";
import {
  FlexViewSpread,
  ListTouchableButtonWrapper,
  ListButtonText,
  styles
} from "./styles";
import { ContainerView, View, FlexView } from "../../components/views";
import { colors } from "../../utils/constants";

const imgDoctor = require("../../../assets/images/Doctor.png");

const AccountScreen = () => (
  <ContainerView>
    <View style={{ marginTop: 30 }}>
      <StyledText>Account Screen Coming Soon...</StyledText>
    </View>
  </ContainerView>
);

export default AccountScreen;

// class AccountScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "michaelbrown@gmail.com",
//       badges: ["Benjamin", "Tommy", "Audrey"]
//     };
//   }

//   render() {
//     const {
//       navigation: { navigate }
//     } = this.props;
//     const { email, badges } = this.state;
//     return (
//       <ContainerView padding={16}>
//         <NavHeader title="Account" size="medium" hasBackButton={false} />
//         <View style={{ padding: 16 }}>
//           <FlexView justifyContent="start">
//             <Avatar rounded size={80} source={imgDoctor} />
//             <View style={{ paddingLeft: 20 }}>
//               <StyledText fontSize={16}>Michael Brown</StyledText>
//               <StyledText fontSize={16} fontFamily="FlamaLight">
//                 {email}
//               </StyledText>
//             </View>
//           </FlexView>
//           <FlexViewSpread style={{ paddingTop: 30 }}>
//             {badges.map(badge => (
//               <Badge
//                 key={badge}
//                 value={badge}
//                 textStyle={styles.badgeText}
//                 badgeStyle={styles.badge}
//               />
//             ))}
//           </FlexViewSpread>
//         </View>
//         <View style={{ paddingTop: 16, paddingBottom: 16 }}>
//           <ListTouchableButtonWrapper onPress={() => navigate("Settings")}>
//             <ListButtonText>Settings</ListButtonText>
//             <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
//           </ListTouchableButtonWrapper>
//           <ListTouchableButtonWrapper onPress={() => navigate("Payment")}>
//             <ListButtonText>Payment</ListButtonText>
//             <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
//           </ListTouchableButtonWrapper>
//           <ListTouchableButtonWrapper>
//             <ListButtonText>Support</ListButtonText>
//             <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
//           </ListTouchableButtonWrapper>
//           <ListTouchableButtonWrapper>
//             <ListButtonText>Log out</ListButtonText>
//             <FontAwesome name="angle-right" color={colors.MIDGREY} size={24} />
//           </ListTouchableButtonWrapper>
//         </View>
//       </ContainerView>
//     );
//   }
// }

// export default AccountScreen;
