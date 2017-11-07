
import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import Icons from "./util/Icons";
import Colors from "./util/Colors";

// ------------------------
// INIT
// ------------------------

function init() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        title: "Send",
        label: "Send",
        screen: "SendController",
        icon: Icons.send
      },
      {
        title: "Receive",
        label: "Receive",
        screen: "ReceiveController",
        icon: Icons.receive
      },
    ],
    tabsStyle: {
      tabBarShowLabels: 'hidden',
      tabBarButtonColor: Colors.Grey30,
      tabBarSelectedButtonColor: Colors.Grey70,
      tabBarBackgroundColor: Colors.WhiteAlmost,
    },
    passProps: {},
    animationType: "slide-down",
    appStyle: {
      orientation: "portrait"
    }
  });
}


export default {
  init,
};
