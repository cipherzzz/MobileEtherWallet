'use strict'

import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import AppStyles from '../util/Styles'
import QrView from '../components/QRView'
import Blockies from 'react-native-blockies';
import Colors from '../util/Colors';

import { connect } from "react-redux";
import {setAccountName} from '../reducers/accounts';

// state map
function mapStateToProps(state) {
    return {
        account: state.accounts.getIn(["list", state.accounts.get("currentAccountId")])
    };
}

class AccountController extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired
    };


    constructor(props) {
        super(props);

        this.props.navigator.setButtons({
            rightButtons: [{id: "delete", title: "Delete"}]
        });

        this.props.navigator.setOnNavigatorEvent(event => {
            if (event.id === "delete") {
                alert("delete");
            }
        });
    }

    render() {
        return (
            <ScrollView style={AppStyles.view}>
                <Blockies
                    blockies={this.props.account.get("address")} //string content to generate icon
                    size={50} // blocky icon size
                    style={{width:50, height:50, backgroundColor: Colors.Grey10}} // style of the view will wrap the icon
                />
                <View style={styles.wrapper}>
                    <View>
                        <Text style={AppStyles.hintText}>Name</Text>
                        <TextInput
                            style={[AppStyles.valueText, AppStyles.valueTextInput]}
                            value={this.props.account.get("name")}
                            autoFocus
                            onChangeText={(value)=>{this.props.dispatch(setAccountName(this.props.account, value))}}
                        />
                    </View>
                </View>
                <View>
                    <Text style={AppStyles.hintText}>Address</Text>
                    <Text selectable style={AppStyles.valueText}>{this.props.account.get("address")}</Text>
                </View>
                <View style={styles.qr}>
                    <QrView text={this.props.account.get("address")}/>
                </View>
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
    }
})

export default connect(mapStateToProps)(AccountController);