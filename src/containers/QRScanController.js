'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';
import Navigation from '../Navigation';
import { importAccount } from '../reducers/accounts';
import Constants from '../util/Constants';
import Colors from '../util/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';

// state map
function mapStateToProps(state) {
  return {};
}

class QRScanController extends Component {
  static propTypes = {
    onBarCodeRead: PropTypes.func,
    isActive: PropTypes.bool,
  };

  static title = 'Scan QR Code';

  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      rightButtons: [{ id: 'close', title: 'Close' }],
    });

    this.props.navigator.setOnNavigatorEvent(event => {
      if (event.id === 'close') {
        Navigation.dismissModal();
      }
    });
  }

  showButtonForSimulator() {
    if (DeviceInfo.isEmulator()) {
      return (
        <View>
          <View style={{ height: 20 }} />
          <Icon.Button
            name="camera"
            backgroundColor={Colors.Green}
            onPress={() => {
              this.props
                .dispatch(
                  importAccount('0x6E1916C1315b1600232523cF58c726A2F224cCE9'),
                )
                .then(balance => {
                  Navigation.dismissModal();
                })
                .catch(error => {
                  Navigation.showNotification(
                    'Unable to Import Scanned Address',
                    'error',
                  );
                });
            }}
          >
            0x6E1916C1315b1600232523cF58c726A2F224cCE9
          </Icon.Button>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    if (false) {
      return <View style={[styles.view]}>{this.renderRects()}</View>;
    }

    return (
      <Camera
        onBarCodeRead={scan => {
          this.props.dispatch(importAccount(scan.data));
        }}
        style={styles.view}
      >
        {this.renderRects()}
        {this.showButtonForSimulator()}
      </Camera>
    );
  }

  renderRects() {
    return (
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle}>
          <View style={styles.innerRectangle} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'black',
    flex: 1,
    padding: 20,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },

  innerRectangle: {
    height: 248,
    width: 248,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#ddd',
    backgroundColor: 'transparent',
  },
});

export default connect(mapStateToProps)(QRScanController);
