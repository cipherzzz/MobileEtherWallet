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
const ScrollableTabView = require('react-native-scrollable-tab-view');
import QrView from '../components/QRView';
import Blockies from 'react-native-blockies';
import Colors from '../util/Colors';
import Constants from '../util/Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Clipboard from 'react-native-clipboard';
import Navigation from '../Navigation';
import TransactionRow from '../components/TransactionRow';
import TransactionsController from '../containers/TransactionsController';
import TokensController from '../containers/TokensController';

import { connect } from 'react-redux';
import {
  setAccountName,
  deleteAccount,
  fetchTransactions,
  fetchTokens,
  fetchAccountInfo,
  saveAccounts,
} from '../reducers/accounts';

// state map
function mapStateToProps(state) {
  let account = state.accounts.getIn([
    'list',
    state.accounts.get('currentAccountId'),
  ]);

  return {
    account: account,
    transactions: account.get('transactions')
      ? account.get('transactions').toArray()
      : [],
    tokens: account.get('tokens') ? account.get('tokens').toArray() : [],
  };
}

class AccountController extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    transactions: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);

    this.props.navigator.setButtons({
      rightButtons: [{ id: 'delete', title: 'Delete' }],
    });

    this.props.navigator.setOnNavigatorEvent(event => {
      if (event.id === 'delete') {
        //Had some timing issues with required props - Clean this up
        Navigation.pop(this.props.navigator);
        this.props.dispatch(deleteAccount(this.props.account.get('address')));
      }
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchTokens(this.props.account));
    this.props.dispatch(fetchTransactions(this.props.account));
  }

  getTokens() {
    let balances = [];
    let tokens = this.props.account.getIn(['info', 'tokens']);

    if (!tokens) {
      return null;
    }

    tokens.forEach(token => {
      let view = (
        <Text
          key={token.getIn(['tokenInfo', 'symbol'])}
          style={{ color: Colors.BlackAlmost }}
        >
          {Number(token.get('balance')) / 100 +
            ' ' +
            token.getIn(['tokenInfo', 'symbol'])}
        </Text>
      );
      balances.push(view);
    });

    return <View>{balances}</View>;
  }

  render() {
    return (
      <ScrollView style={{ flex: 5 }}>
        <View style={{ flex: 2 }}>
          <Text style={{ color: Colors.BlackAlmost, margin: 5, fontSize: 15 }}>
            Info
          </Text>
          <View
            style={[
              styles.wrapper,
              { backgroundColor: Colors.White, padding: 10 },
            ]}
          >
            <View>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', flex: 6 }}
              >
                <Blockies
                  blockies={this.props.account.get('address')} //string content to generate icon
                  size={50} // blocky icon size
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: Colors.White,
                    flex: 1,
                  }} // style of the view will wrap the icon
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 6,
                marginTop: 10,
              }}
            >
              <View style={{ flex: 5 }}>
                <Text style={styles.balance}>Balance</Text>
                <Text style={{ color: Colors.BlackAlmost }}>
                  {this.props.account.getIn(['info', 'ETH', 'balance']) +
                    ' ETH'}
                </Text>
                {this.getTokens()}
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.set(this.props.account.get('address'));
                    Navigation.showNotification(
                      'Address Copied to Clipboard',
                      'success',
                    );
                  }}
                >
                  <Ionicon
                    name={'ios-copy-outline'}
                    size={40}
                    color={Colors.Green}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.showModal('QRView', {
                      text: this.props.account.get('address'),
                      title: this.props.account.get('name'),
                    });
                  }}
                >
                  <FontAwesome name={'qrcode'} size={40} color={Colors.Green} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 6,
                marginTop: 10,
              }}
            >
              <View style={{ flex: 5 }}>
                <Text style={styles.address}>Address</Text>
                <Text style={{ color: Colors.BlackAlmost }}>
                  {this.props.account.get('address')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollableTabView style={{ flex: 3, margin: 10 }}>
          <TransactionsController
            tabLabel="Transactions"
            transactions={this.props.transactions}
            account={this.props.account}
            onSelect={transaction => {
              Navigation.push(this.props.navigator, 'TransactionController', {
                passProps: {
                  transaction: transaction,
                  account: this.props.account,
                },
              });
            }}
          />
          <TokensController
            tabLabel="Tokens"
            tokens={this.props.tokens}
            account={this.props.account}
            onSelect={transaction => {
              Navigation.push(this.props.navigator, 'TransactionController', {
                passProps: {
                  transaction: transaction,
                  account: this.props.account,
                },
              });
            }}
          />
        </ScrollableTabView>
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

export default connect(mapStateToProps)(AccountController);
