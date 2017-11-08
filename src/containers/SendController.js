'use strict'

import React, { Component, PropTypes } from 'react'
import { Button, View, Text, ListView, ScrollView, StatusBar, StyleSheet } from 'react-native'
import AccountListRow from '../components/AccountListRow'
import AppStyles from '../util/Styles'
import Navigation from '../util/Navigation'

import {setCurrentAccount} from '../reducers/accounts'

import { connect } from "react-redux";

// state map
function mapStateToProps(state) {
    return {
        accounts: state.accounts.list
    };
}

class SendController extends Component {
    static propTypes = {
        accounts: PropTypes.arrayOf(PropTypes.shape({
            address: PropTypes.string.isRequired
        })).isRequired
    }

    constructor (props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(props.accounts)
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.accounts)
        })
    }

    render () {

        let createButton = <Button
        style={styles.introButton}
        onPress={()=>{alert("Request New ETH Address")}}
        color='green'
        title='Request New ETH Address'
            />;

        if (!this.props.accounts.length) {
            return (
                <View style={AppStyles.view}>
        <View style={styles.introContainer}>
        <Text style={styles.introText}>
            You need an address in order to Send/Receive Eth
            </Text>
            <View style={AppStyles.buttonContainer}>
            {createButton}
                </View>
                </View>
                </View>
        )
        }
        return (
             <ScrollView>
            <ListView
        style={AppStyles.listView}
        dataSource={this.state.dataSource}
        renderRow={(rowData, sectionID: number, rowID: number, highlightRow) => {
            return (
                <AccountListRow
            upperText={rowData.name ? rowData.name : 'no name'}
            lowerText={'0x' + rowData.address}
            onPress={() => {
                highlightRow(sectionID, rowID);
                let account = this.props.accounts[rowID];
                this.props.dispatch(setCurrentAccount(account)).then((account)=>{
                    Navigation.push(this.props.navigator, "AccountController", {
                    account: account
                });
                })

            }}
        />
        )
        }}
    >
            </ListView>
        {createButton}
                </ScrollView>
    )
    }
}

const styles = StyleSheet.create({
    introContainer: {
        padding: 30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    introText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20
    }
})

export default connect(mapStateToProps)(SendController);