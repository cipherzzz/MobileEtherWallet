
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
        title: "Accounts",
        label: "Accounts",
        screen: "AccountsController",
        icon: Icons.accounts,
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
      orientation: "portrait",
      navBarTextColor: Colors.Grey50, // change the text color of the title (remembered across pushes)
      navBarBackgroundColor: Colors.White,
      navBarButtonColor: Colors.Red,
      screenBackgroundColor: Colors.Grey10
    }
  });
}

// ------------------------
// PUSH / POP
// ------------------------
function push(navigator, screenId, props) {
  if (!navigator) {
    throw "Missing navigator param for push";
  }
  if (!screenId) {
    throw "Missing screenId param for push";
  }

  const screenNavigationProps = {};

  navigator.push({
    screen: screenId,
      ...screenNavigationProps,
      ...props
});
}

function pop(navigator) {
  if (!navigator) {
    throw "Missing navigator param for pop";
  }

  navigator.pop({ animated: true });
}

function popToRoot(navigator) {
  if (!navigator) {
    throw "Missing navigator param for popToRoot";
  }

  navigator.popToRoot();
}

// ------------------------
// MODALS
// ------------------------
function showModal(screenId, props) {
  if (!screenId) {
    throw "Missing screenId param for showModal";
  }

  const screenNavigationProps = {};

  Navigation.showModal({
    screen: screenId,
    animationType: "slide-up",
      ...screenNavigationProps,
      ...props
});
}

function dismissModal() {
  // RETURNS A PROMISE
  return Navigation.dismissModal({
    animationType: "slide-down"
  });
}

function dismissAllModals() {
  return Navigation.dismissAllModals();
}

// ------------------------
// DIALOG
// ------------------------
function showDialog(screen = "Dialog", props = {}, callback) {
  Navigation.showModal({
        screen: screen,
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: "transparent",
          modalPresentationStyle: "overCurrentContext",

          // optional props
          orientation: props.orientation ? props.orientation : "portrait"
        },
        overrideBackPress: true,
        animationType: "none",
        passProps: {
            ...props,
        callback: event => {
        dismissDialog().then(() => {
          if (callback) {
    callback(event);
  }
});
}
}
});
}
function showAlert(props = {}, callback) {
  const dialogProps = {
    // defaults
    yesText: "OK",
    noText: "",

      ...props
};
  showDialog("Dialog", dialogProps, callback);
}
function dismissDialog() {
  // RETURNS A PROMISE
  const params = {
    animationType: "none"
  };
  if (Platform.OS == "ios") {
    return Navigation.dismissModal(params);
  } else {
    return new Promise((resolve, reject) => {
          Navigation.dismissModal(params);
    resolve();
  });
  }
}

// ------------------------
// NOTIFICATION
// ------------------------
function showNotification(message, type) {
  Navigation.showInAppNotification({
    screen: "ViewNotification",
    dismissWithSwipe: true,
    autoDismissTimerSec: 3,
    passProps: {
      message,
      type
    }
  });
}

export default {
  init,
  push,
  pop,
  popToRoot,
  showModal,
  dismissModal,
  dismissAllModals,
  showDialog,
  showAlert,
  dismissDialog,
  showNotification
};

