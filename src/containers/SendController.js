import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { connect } from "react-redux";

// state map
function mapStateToProps(state) {
    return {
    };
}

export class SendController extends Component {
    render() {
        return <Text>Send</Text>;
    }
}

export default connect(mapStateToProps)(SendController);