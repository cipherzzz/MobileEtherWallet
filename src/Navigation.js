
import Immutable from "immutable";

import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";

const InitialScreen = "LoginController";

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
      },
      {
        title: "Receive",
        label: "Receive",
        screen: "ReceiveController",
      },
    ],
  });
}


export default {
  init,
};
