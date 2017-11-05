
import React from 'react';
import { Navigation } from "react-native-navigation";

import SendController from "./containers/SendController";
import ReceiveController from "./containers/ReceiveController";


export const screensMap = {
  SendController,
  ReceiveController,
};

export function registerScreens(store, Provider) {
  for (let key in screensMap) {
    if (screensMap.hasOwnProperty(key)) {
      const ViewObject = screensMap[key];
      Navigation.registerComponent(key.toString(), () => ViewObject, store, Provider);
    }
  }
}

export default screensMap;
