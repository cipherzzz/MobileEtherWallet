
'use strict'

import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, StatusBar, TouchableOpacity, Text } from 'react-native'
import Camera from 'react-native-camera'
import AppStyles from '../util/Styles'
import Navigation from '../Navigation';
import {importAccount} from "../reducers/accounts";
import Constants from "../util/Constants";

import { connect } from "react-redux";

// state map
function mapStateToProps(state) {

    return {

    };
}

class QRScanController extends Component {
    static propTypes = {
        onBarCodeRead: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    }

    static title = "Scan QR Code"

    constructor(props) {
        super(props);

        this.props.navigator.setButtons({
            rightButtons: [{id: "close", title: "Close"}]
        });

        this.props.navigator.setOnNavigatorEvent(event => {
            if (event.id === "close") {
                Navigation.dismissModal();
            }
        });
    }

    render () {
        if (false) {
            return (
                <View style={[AppStyles.view, styles.view]}>
                    { this.renderRects() }
                </View>
            )
        }

        return (
            <Camera onBarCodeRead={(scan)=>{this.props.dispatch(importAccount(scan.data))}} style={AppStyles.view}>
                <TouchableOpacity onPress={()=>{
                    this.props.dispatch(importAccount("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae"))
                    .then((balance)=>{ Navigation.dismissModal() })
                    .catch((error)=>{Navigation.showNotification("Unable to Import Scanned Address", "error")});
                    }}>
                    <Text style={{width: 100, height:40, backgroundColor:"blue"}}>Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.dispatch(importAccount("0x0D6e00a6aFd70F94e45Ae4fC6639ee35E2944b86"))
                    .then((balance)=>{ Navigation.dismissModal() })
                    .catch((error)=>{Navigation.showNotification("Unable to Import Scanned Address", "error")});
                    }}>
                    <Text style={{width: 100, height:40, backgroundColor:"blue"}}>Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.dispatch(importAccount("0x6E1916C1315b1600232523cF58c726A2F224cCE9"))
                    .then((balance)=>{ Navigation.dismissModal() })
                    .catch((error)=>{Navigation.showNotification("Unable to Import Scanned Address", "error")});
                    }}>
                    <Text style={{width: 100, height:40, backgroundColor:"blue"}}>Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.dispatch(importAccount(Constants.LEDGER_ADDRESS))
                    .then((balance)=>{ Navigation.dismissModal() })
                    .catch((error)=>{Navigation.showNotification("Unable to Import Scanned Address", "error")});
                    }}>
                    <Text style={{width: 100, height:40, backgroundColor:"blue"}}>Scan</Text>
                </TouchableOpacity>
                { this.renderRects() }
            </Camera>
        )
    }

    renderRects () {
        return (
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                    <View style={styles.innerRectangle} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'black'
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    rectangle: {
        borderWidth: 2,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        width: 250,
        borderColor: '#ccc',
        backgroundColor: 'transparent'
    },

    innerRectangle: {
        height: 248,
        width: 248,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: '#ddd',
        backgroundColor: 'transparent'
    }
});

export default connect(mapStateToProps)(QRScanController);