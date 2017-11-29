import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions, StyleSheet, Platform } from 'react-native';

import Colors from '../util/Colors';
import Constants from '../util/Constants';

import Ionicon from 'react-native-vector-icons/Ionicons';

export default class ViewNotification extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['error', 'info', 'success']),
    message: PropTypes.string.isRequired,
  };
  static defaultProps = {
    type: 'info',
  };

  getColor() {
    switch (this.props.type) {
      case 'error':
        return Colors.RedFlat;

      case 'info':
        return Colors.BlueMain;

      case 'success':
        return Colors.Green;
    }
  }

  renderIcon() {
    switch (this.props.type) {
      case 'error':
        return (
          <Ionicon name="ios-alert-outline" color={Colors.White} size={35} />
        );

      case 'info':
        return (
          <Ionicon name="ios-alert-outline" color={Colors.White} size={35} />
        );

      case 'success':
        return (
          <Ionicon
            name="ios-checkmark-circle-outline"
            color={Colors.White}
            size={35}
          />
        );
    }
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.getColor() }]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>{this.renderIcon()}</View>

          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={styles.text}>
              {this.props.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    height: 80, //have to set this for the notification to show on Android
    width: Dimensions.get('window').width,
  },
  content: {
    margin: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.White,
    fontFamily: Constants.FontRegular,
    fontSize: 16,
    marginLeft: 16,
  },
});
