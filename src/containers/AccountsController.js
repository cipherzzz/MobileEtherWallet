'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Button,
  View,
  Text,
  ListView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import AccountListRow from '../components/AccountListRow';
import Navigation from '../Navigation';
import Immutable from 'immutable';
import Constants from '../util/Constants';
import Colors from '../util/Colors';

import {
  selectAccount,
  fetchAccountInfo,
  populateAccounts,
} from '../reducers/accounts';

import { connect } from 'react-redux';

// state map
function mapStateToProps(state) {
  let accounts = state.accounts.get('list');
  let list = [];
  if (accounts) {
    list = accounts.valueSeq().toArray();
  }

  return {
    accounts: list,
  };
}

class AccountsController extends Component {
  static propTypes = {
    accounts: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.accounts),
    };

    this.props.navigator.setButtons({
      rightButtons: [{ id: 'scan', title: 'Scan' }],
    });

    this.props.navigator.setOnNavigatorEvent(event => {
      if (event.id === 'scan') {
        this.scanAccount();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.accounts);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.accounts),
    });
  }

  componentDidMount() {
    this.props.dispatch(populateAccounts());
  }

  createAccount() {
    this.props
      .dispatch(createAccount())
      .then(account => {
        this.props.dispatch(selectAccount(account.address)).then(accountId => {
          Navigation.push(this.props.navigator, 'AccountController');
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  scanAccount() {
    Navigation.showModal('QRScanController');
  }

  render() {
    return <View>{this.getAccountsOrPlaceholder()}</View>;
  }

  getAccountsOrPlaceholder() {
    if (this.props.accounts.length === 0) {
      return (
        <Text style={styles.introText}>
          {"Tap 'Scan' to import an Ethereum Address"}
        </Text>
      );
    } else {
      return (
        <ScrollView>
          <ListView
            style={[styles.listView]}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderSeparator={(sectionId, rowId) => {
              return (
                <View key={`sep:${sectionId}:${rowId}`} style={{ height: 1 }} />
              );
            }}
            renderSectionHeader={() => {
              return (
                <Text key={'header'} style={styles.header}>
                  Accounts
                </Text>
              );
            }}
            renderRow={(
              rowData,
              sectionID: number,
              rowID: number,
              highlightRow,
            ) => {
              return (
                <AccountListRow
                  name={rowData.get('name') ? rowData.get('name') : 'no name'}
                  address={rowData.get('address')}
                  key={rowData.get('address')}
                  balance={rowData.getIn(['info', 'ETH', 'balance'])}
                  onPress={() => {
                    highlightRow(sectionID, rowID);
                    this.props
                      .dispatch(selectAccount(rowData.get('address')))
                      .then(account => {
                        Navigation.push(
                          this.props.navigator,
                          'AccountController',
                        );
                      });
                  }}
                />
              );
            }}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  introContainer: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
  introText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 60,
  },
  listView: {
    flex: 1,
  },
  header: {
    fontSize: 14,
    color: Colors.BlackAlmost,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default connect(mapStateToProps)(AccountsController);
