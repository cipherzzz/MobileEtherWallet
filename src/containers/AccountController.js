'use strict'

import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, ListView } from 'react-native'
import AppStyles from '../util/Styles'
import QrView from '../components/QRView'
import Blockies from 'react-native-blockies';
import Colors from '../util/Colors';
import Ionicon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Clipboard from "react-native-clipboard";
import Navigation from "../Navigation";
import TransactionRow from "../components/TransactionRow";

import { connect } from "react-redux";
import {setAccountName, deleteAccount, fetchTransactions, fetchBalance} from '../reducers/accounts';

// state map
function mapStateToProps(state) {
    let account = state.accounts.getIn(["list", state.accounts.get("currentAccountId")]);

    return {
        account: account,
        transactions: account.get("transactions").toArray()
    };
}

class AccountController extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired,
        transactions: PropTypes.any.isRequired,
    };


    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(props.transactions),
        }

        this.props.navigator.setButtons({
            rightButtons: [{id: "delete", title: "Delete"}]
        });

        this.props.navigator.setOnNavigatorEvent(event => {
            if (event.id === "delete") {
                //Had some timing issues with required props - Clean this up
                Navigation.pop(this.props.navigator);
                props.dispatch(deleteAccount(props.account.get("address")));
            }
        });


    }

    componentDidMount(){
        this.props.dispatch(fetchTransactions(this.props.account));
        this.props.dispatch(fetchBalance(this.props.account));
    }

    componentWillReceiveProps(newProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(newProps.transactions),
        }
    }

    getListOrPlaceholder() {
        if (this.props.transactions.length === 0) {
            return (<Text style={styles.introText}>{"No Transactions"}</Text>)
        } else {
            return (
                <ListView
                    style={[{flex: 1, margin: 5}]}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderSeparator={()=>{return <View style={{height: 1}} /> }}
                    renderSectionHeader={()=>{return <Text style={AppStyles.header}>Transactions</Text>}}
                    renderRow={(rowData, sectionID: number, rowID: number, highlightRow) => {
                return (
                    <TransactionRow
                        account={this.props.account}
                        transaction={rowData}
                        onPress= {
                            () => {
                                highlightRow(sectionID, rowID);
                                //this.props.dispatch(selectAccount(account.get("address"))).then((account)=>{
                                //    Navigation.push(this.props.navigator, "AccountController");
                                //});
                                }
                            }
                    />)
                }}>
                </ListView>)
            }
        }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <Text style={{color: Colors.BlackAlmost, margin: 5, fontSize: 15}}>Info</Text>
                <View style={[styles.wrapper, {backgroundColor: Colors.White, padding: 5}]}>
                    <View>
                        <View style={{flexDirection: "row", alignItems: "center", flex: 6}}>
                            <Blockies
                                blockies={this.props.account.get("address")} //string content to generate icon
                                size={50} // blocky icon size
                                style={{width:50, height:50, backgroundColor: Colors.Grey10, flex: 1}} // style of the view will wrap the icon
                            />
                            <View style={{marginLeft: 10, flex: 5}}>
                                <Text style={styles.name}>Name</Text>
                                <TextInput
                                    style={styles.nameInput}
                                    value={this.props.account.get("name")}
                                    placeholder={"Account Name"}
                                    autoFocus
                                    onChangeText={(value)=>{this.props.dispatch(setAccountName(this.props.account, value))}}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", flex: 6, marginTop: 10}}>
                        <View style={{flex: 5}}>
                            <Text style={styles.balance}>Balance</Text>
                            <Text
                                style={{color: Colors.BlackAlmost}}>{this.props.account.get("balance") + " ETH"}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>
                    {
                    Navigation.showModal("QRView",
                    {text: this.props.account.get("address"),
                    title: this.props.account.get("name")})
                    }}>
                            <FontAwesome name={"qrcode"} size={40} color={Colors.Green}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", flex: 6, marginTop: 10}}>
                        <View style={{flex: 5}}>
                            <Text style={styles.address}>Address</Text>
                            <Text style={{color: Colors.BlackAlmost}}>{this.props.account.get("address")}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{
                    Clipboard.set(this.props.account.get("address"));
                    Navigation.showNotification("Address Copied to Clipboard", "success")
                    }}>
                            <Ionicon name={"ios-copy-outline"} size={40} color={Colors.Green}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.getListOrPlaceholder()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5
    },
    qr: {
        padding: 10,
        marginTop: 20
    },
    deleteText: {
        textAlign: 'right'
    },
    changePinText: {
        textAlign: 'left',
        color: 'green'
    },
    actionsContainer: {
        marginTop: 40,
        flexDirection: 'row'
    },
    actionButtonContainer: {
        flex: 1
    },
    name: {
        fontSize: 16,
        color: Colors.Grey50,
        marginBottom: 5
    },
    nameInput: {
        fontSize: 16,
        color: Colors.BlackAlmost
    },
    address: {
        color: Colors.Grey50,
        fontSize: 14
    },
    balance: {
        color: Colors.Grey50,
        fontSize: 14
    },
})

export default connect(mapStateToProps)(AccountController);