import { PixelRatio, Platform } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const icons = {
  send: {
    name: 'ios-send-outline',
    size: getIconSize(30),
    color: 'green',
  },
  receive: {
    name: 'ios-cash-outline',
    size: getIconSize(30),
    color: 'green',
  },
  accounts: {
    name: 'ios-list-outline',
    size: getIconSize(30),
    color: 'green',
  },
  copy: {
    name: 'ion-ios-copy-outline',
    size: getIconSize(30),
    color: 'green',
  },
};

let loadedIcons = {};

export const loadIcons = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map(iconName => {
      iconData = icons[iconName];
      return Ionicon.getImageSource(
        iconData.name,
        iconData.size,
        iconData.color,
      );
    }),
  )
    .then(sources => {
      Object.keys(icons).forEach(
        (iconName, idx) => (loadedIcons[iconName] = sources[idx]),
      );

      // Call resolve (and we are done)
      resolve(true);
    })
    .catch(error => {
      console.log('Error getting image sources');
      console.log(error);
      reject();
    });
});

export function getIcon(name) {
  return loadedIcons[name];
}

function getIconSize(size) {
  if (__DEV__ === false && Platform.OS === 'android') {
    return PixelRatio.getPixelSizeForLayoutSize(size);
  } else {
    return size;
  }
}

export default loadedIcons;
