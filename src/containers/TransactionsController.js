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
import Colors from '../util/Colors';
import Constants from '../util/Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Navigation from '../Navigation';
import TransactionRow from '../components/TransactionRow';

export default class TransactionsController extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    transactions: PropTypes.any.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.transactions),
    };
  }

  componentWillReceiveProps(newProps) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: ds.cloneWithRows(newProps.transactions),
    };
  }

  getListOrPlaceholder() {
    if (this.props.transactions.length === 0) {
      return <Text style={styles.introText}>{'No Transactions'}</Text>;
    } else {
      return (
        <ListView
          style={[{ flex: 1, margin: 5 }]}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderSeparator={(sectionId, rowId, adjacentRowHighlighted) => {
            return (
              <View key={`sep:${sectionId}:${rowId}`} style={{ height: 1 }} />
            );
          }}
          renderSectionHeader={() => {
            return (
              <Text key={'header'} style={styles.header}>
                Transactions
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
              <TransactionRow
                account={this.props.account}
                token={'ETH'}
                transaction={rowData}
                key={rowData.get('hash') + '_' + rowData.get('timeStamp')}
                onPress={() => {
                  highlightRow(sectionID, rowID);
                  this.props.onSelect(rowData);
                }}
              />
            );
          }}
        />
      );
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>{this.getListOrPlaceholder()}</ScrollView>
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
  header: {
    fontSize: 14,
    color: Colors.BlackAlmost,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
});
