import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { connect } from 'react-redux';

// state map
function mapStateToProps(state) {
  return {};
}

export class ReceiveController extends Component {
  render() {
    return <Text>Receive</Text>;
  }
}

export default connect(mapStateToProps)(ReceiveController);
