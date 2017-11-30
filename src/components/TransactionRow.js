'use strict';

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import Colors from '../util/Colors';
import Constants from '../util/Constants';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { getValueForTransaction } from '../util/Util';

class TransactionRow extends Component {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const timeStamp = this.props.transaction.get('timestamp') * 1000;
    const date = moment(Number(timeStamp)).format('MMM Do YYYY, h:mm:ss a');
    const address = this.props.account.get('address').toLowerCase();
    const to = this.props.transaction.get('to').toLowerCase();
    const from = this.props.transaction.get('from').toLowerCase();
    const token = this.props.token;
    const type = address === from ? 'Send' : 'Receive';
    const cellAddress = type === 'Receive' ? from : to;
    const amountColor = address === from ? Colors.RedFlat : Colors.Green;

    return (
      <TouchableHighlight
        style={styles.row}
        onPress={this.props.onPress}
        underlayColor="#0004"
      >
        <View style={{ flexDirection: 'row', flex: 6 }}>
          <View style={styles.txDetailsGroup}>
            <Text
              style={[styles.name, { color: amountColor }]}
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {type}
            </Text>
            <Text
              style={styles.address}
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {cellAddress}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {date}
            </Text>
          </View>
          <View style={styles.amountGroup}>
            <Text style={styles.balance} numberOfLines={1}>
              {getValueForTransaction(this.props.transaction) + ' ' + token}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicon
              name={'ios-arrow-dropright-outline'}
              size={24}
              color={Colors.Green}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#F8F8F8',
    padding: 5,
  },
  innerRow: {
    padding: 5,
    flexDirection: 'row',
  },
  txDetailsGroup: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 3,
    marginRight: 10,
  },
  amountGroup: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 2,
    marginRight: 10,
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
    color: Colors.Grey70,
    fontSize: 14,
  },
  date: {
    color: Colors.Grey50,
    fontSize: 12,
  },
  balance: {
    color: Colors.BlackAlmost,
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'right',
  },
});

module.exports = TransactionRow;
