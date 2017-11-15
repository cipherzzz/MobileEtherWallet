'use strict'

import React, { Component, PropTypes } from 'react'
import { Button, View, Text, ListView, ScrollView, StatusBar, StyleSheet, TextInput } from 'react-native'
import AccountListRow from '../components/AccountListRow'
import AppStyles from '../util/Styles'
import Navigation from '../Navigation'
import Immutable from 'immutable'
import EthJs from 'ethereumjs-wallet-react-native'


import {selectAccount, createAccount} from '../reducers/accounts'

import { connect } from "react-redux";

// state map
function mapStateToProps(state) {

    return {
        accounts: state.accounts.get("list").valueSeq().toArray(),
    };
}

class AccountsController extends Component {
    static propTypes = {
        accounts: PropTypes.any.isRequired,
    }



    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(props.accounts),
        }

        this.props.navigator.setButtons({
            rightButtons: [{id: "add", title: "Add"}]
        });

        this.props.navigator.setOnNavigatorEvent(event => {
            if (event.id === "add") {
                this.createAccount();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.accounts);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.accounts),
        })
    }

    createAccount() {
        this.props.dispatch(createAccount())
            .then((account)=> {
                this.props.dispatch(selectAccount(account.address)).then((accountId)=> {
                    Navigation.push(this.props.navigator, "AccountController");
                })
            })
            .catch((error)=> {
                alert(error)
            })
    }

    render() {


        return (
            <View>
                {this.getAccountsOrPlaceholder()}
            </View>
        );


    }

    getAccountsOrPlaceholder() {
        if (this.props.accounts.length === 0) {
            return (
                <Text style={styles.introText}>{"Tap '+' to create an ETH Account"}</Text>
            )
        } else {

            return (
                <ScrollView>
                    <ListView
                        style={[AppStyles.listView]}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderSeparator={()=>{return <View style={{height: 1}}/>}}
                        renderSectionHeader={()=>{return <Text style={AppStyles.header}>Accounts</Text>}}
                        renderRow={(rowData, sectionID: number, rowID: number, highlightRow) => {
                return (
                    <AccountListRow
                        name={rowData.get("name") ? rowData.get("name") : 'no name'}
                        address={rowData.get("address")}
                        balance={rowData.get("balance")}
                        onPress= {
                            () => {
                                highlightRow(sectionID, rowID);
                                this.props.dispatch(selectAccount(rowData.get("address"))).then((account)=>{
                                    Navigation.push(this.props.navigator, "AccountController");
                                });
                                }
                            }
                    />
            )
            }}>
                    </ListView>
                </ScrollView>
            )
        }
    }
}


const styles = StyleSheet.create({
    introContainer: {
        padding: 30,
        flex: 1,
        justifyContent: 'center'
    },
    introText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 60,
    }
})

export default connect(mapStateToProps)(AccountsController);