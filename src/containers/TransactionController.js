'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ListView,
} from 'react-native';
import moment from 'moment';

import Colors from '../util/Colors';
import Constants from '../util/Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from 'react-native-clipboard';
import Navigation from '../Navigation';

import { connect } from 'react-redux';
import {
  setAccountName,
  deleteAccount,
  fetchTransactions,
  fetchTokens,
  fetchAccountInfo,
  saveAccounts,
} from '../reducers/accounts';

import { getValueForTransaction } from '../util/Util';

export default class TransactionController extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    transaction: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
  }

  renderInfoRow(header, value) {
    return (
      <View
        key={header}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 6,
          marginTop: 10,
        }}
      >
        <View style={{ flex: 5 }}>
          <Text style={styles.address}>{header}</Text>
          <Text style={{ color: Colors.BlackAlmost }}>{value}</Text>
        </View>
      </View>
    );
  }

  renderTokenInfo() {
    const tokenInfo = this.props.transaction.getIn(['tokenInfo']);
    let views = [];
    if (tokenInfo) {
      views.push(this.renderInfoRow('Name', tokenInfo.get('name')));
      views.push(this.renderInfoRow('Symbol', tokenInfo.get('symbol')));
    } else {
      views.push(this.renderInfoRow('Name', 'Ethereum'));
      views.push(this.renderInfoRow('Symbol', 'ETH'));
    }
    return views;
  }

  renderSendReceive() {
    const from = this.props.transaction.get('from').toLowerCase();
    const type =
      this.props.account.get('address').toLowerCase() === from
        ? 'Send'
        : 'Receive';
    return this.renderInfoRow('Type', type);
  }

  render() {
    const timeStamp = this.props.transaction.get('timestamp') * 1000;
    const date = moment(Number(timeStamp)).format('MMM Do YYYY, h:mm:ss a');
    const success = this.props.transaction.get('success');
    const successValue =
      success === undefined ? 'YES' : success === true ? 'YES' : 'NO';

    return (
      <ScrollView style={{ flex: 5 }}>
        <View style={{ flex: 2 }}>
          <Text style={{ color: Colors.BlackAlmost, margin: 5, fontSize: 15 }}>
            Transaction Details
          </Text>
          <View
            style={[
              styles.wrapper,
              { backgroundColor: Colors.White, padding: 10 },
            ]}
          >
            {this.renderTokenInfo()}
            {this.renderSendReceive()}
            {this.renderInfoRow('Status', successValue)}
            {this.renderInfoRow('To', this.props.transaction.get('to'))}
            {this.renderInfoRow('From', this.props.transaction.get('from'))}
            {this.renderInfoRow(
              'Amount',
              getValueForTransaction(this.props.transaction),
            )}
            {this.renderInfoRow('Date', date)}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
  },
  qr: {
    padding: 10,
    marginTop: 20,
  },
  deleteText: {
    textAlign: 'right',
  },
  changePinText: {
    textAlign: 'left',
    color: 'green',
  },
  actionsContainer: {
    marginTop: 40,
    flexDirection: 'row',
  },
  actionButtonContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: Colors.BlackAlmost,
    marginBottom: 5,
  },
  nameInput: {
    fontSize: 16,
    color: Colors.BlackAlmost,
    backgroundColor: Colors.Red,
    width: 100,
  },
  address: {
    color: Colors.Grey50,
    fontSize: 14,
  },
  balance: {
    color: Colors.Grey50,
    fontSize: 14,
  },
  introText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 60,
  },
});
