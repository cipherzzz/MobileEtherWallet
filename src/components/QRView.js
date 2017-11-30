'use strict';

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode';
import Navigation from '../Navigation';

export default class QrView extends Component {
  static propTypes = {
    text: PropTypes.string,
    screen: PropTypes.bool,
  };

  static defaultProps = {
    screen: false,
  };

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

  render() {
    if (this.props.screen) {
      return <View style={styles.view}>{this.renderQr()}</View>;
    }

    return this.renderQr();
  }

  renderQr() {
    return (
      <View style={styles.rectangleContainer}>
        <QRCode
          value={this.props.text}
          size={250}
          bgColor="black"
          fgColor="white"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  view: {
    flex: 1,
    padding: 20,
  },
});
