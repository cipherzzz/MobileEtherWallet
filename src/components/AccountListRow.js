'use strict'

import React, { Component, PropTypes } from 'react'
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native'
import AppStyles from '../util/Styles'
import Blockies from 'react-native-blockies';
import Colors from '../util/Colors';

class AccountListRow extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        balance: PropTypes.string,
        onPress: PropTypes.func.isRequired,
    }



    render () {

        return (
            <TouchableHighlight style={styles.row} onPress={this.props.onPress} underlayColor='#0004'>
            <View style={{flexDirection: 'row', flex: 6}}>
                <Blockies
                    blockies={this.props.address} //string content to generate icon
                    size={50} // blocky icon size
                    style={{width:50, height:50, backgroundColor: Colors.Grey10, marginRight: 10}} // style of the view will wrap the icon
                />
                <View style={styles.accountDetails}>
                <Text style={styles.name} ellipsizeMode='middle' numberOfLines={1}>{this.props.name}</Text>
                <Text style={styles.address} ellipsizeMode='middle' numberOfLines={1}>{this.props.address}</Text>
                </View>
                <View style={{flex: 2, flexDirection: "row", alignItems: "center"}}>
                <Text style={styles.balance} ellipsizeMode='middle' numberOfLines={1}>{Number(this.props.balance).toFixed(8)+" ETH"}</Text>
                </View>
                </View>
            </TouchableHighlight>
    )
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: '#F8F8F8',
        padding: 5
    },
    innerRow: {
        padding: 5,
        flexDirection: 'row'
    },
    accountDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 2
    },
    icon: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 10,
        marginBottom: 0
    },
    name: {
        fontSize: 16,
        color: Colors.Grey50
    },
    address: {
        color: Colors.Grey50,
        fontSize: 14
    },
    balance: {
        color: Colors.BlackAlmost,
        fontSize: 16,
        marginLeft: 5
    }
})

module.exports = AccountListRow;
