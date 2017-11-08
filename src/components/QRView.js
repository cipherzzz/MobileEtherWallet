'use strict'

import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import QRCode from 'react-native-qrcode'
import AppStyles from '../util/Styles'

export default class QrView extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        screen: PropTypes.bool
    }

    static defaultProps = {
        screen: false
    }

    render () {
        if (this.props.screen) {
            return (
                <View style={AppStyles.view}>
            {this.renderQr()}
        </View>
        )
        }

        return this.renderQr()
    }

    renderQr () {
        return (
            <View style={styles.rectangleContainer}>
    <QRCode
        value={this.props.text}
        size={250}
        bgColor='black'
        fgColor='white'
            />
            </View>
    )
    }
}

const styles = StyleSheet.create({
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
})