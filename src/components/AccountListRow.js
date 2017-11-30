'use strict';

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import Blockies from 'react-native-blockies';
import Colors from '../util/Colors';
import Constants from '../util/Constants';

class AccountListRow extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    balance: PropTypes.number,
    onPress: PropTypes.func.isRequired,
  };

  getBlockiesOrNothing() {
    if (this.props.address) {
      return (
        <Blockies
          blockies={this.props.address} //string content to generate icon
          size={75} // blocky icon size
          style={{
            width: 75,
            height: 75,
            backgroundColor: Colors.Grey10,
            marginRight: 10,
          }} // style of the view will wrap the icon
        />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={this.props.onPress}
        underlayColor="#0004"
      >
        <View style={{ flexDirection: 'row', flex: 6 }}>
          {this.getBlockiesOrNothing()}
          <View style={styles.accountDetails}>
            <Text
              style={styles.address}
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {this.props.address}
            </Text>
            <Text
              style={styles.balance}
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {this.props.balance + ' ETH'}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: Colors.White,
    padding: 5,
  },
  innerRow: {
    padding: 5,
    flexDirection: 'row',
  },
  accountDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 2,
  },
  icon: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 0,
  },
  name: {
    fontSize: 16,
    color: Colors.Grey50,
  },
  address: {
    color: Colors.Grey50,
    fontSize: 16,
  },
  balance: {
    color: Colors.BlackAlmost,
    fontSize: 20,
    marginRight: 5,
    textAlign: 'right',
  },
});

module.exports = AccountListRow;
