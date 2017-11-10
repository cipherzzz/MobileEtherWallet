'use strict'

import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native'
import AppStyles from '../util/Styles'
import QrView from '../components/QRView'
import Blockies from 'react-native-blockies';
import Colors from '../util/Colors';

import { connect } from "react-redux";

// state map
function mapStateToProps(state) {
    return {
        account: state.accounts.getIn(["list", state.accounts.get("currentAccountId")])
    };
}

class AccountController extends Component {
    static propTypes = {
        account: PropTypes.object.isRequired
    }

    state = {
        isEditing: false,
        name: this.props.account.name
    }

    startEdit = () => {
    this.setEditing(true)
    this.setState({
        name: this.props.account.name
})

alert(JSON.stringify(this.props.account))
}

cancelEdit = () => {
    this.setEditing(false)
}

finishEdit = () => {
    this.setEditing(false)
    this.props.onNameChange(this.props.account, this.state.name)
}

updateName = (name) => {
    this.setState({ name })
}

setEditing (isEditing) {
    this.setState({ isEditing })
}

render () {
    return (
        <ScrollView style={AppStyles.view}>
<Blockies
    blockies={this.props.account.get("address")} //string content to generate icon
    size={50} // blocky icon size
    style={{width:50, height:50, backgroundColor: Colors.Grey10}} // style of the view will wrap the icon
/>
        <TouchableOpacity
    style={styles.wrapper}
    onLongPress={this.startEdit}
>
<View>
    <Text style={AppStyles.hintText}>Name</Text>
    { this.state.isEditing
        ? (
    <TextInput
        style={[AppStyles.valueText, AppStyles.valueTextInput]}
    value={this.state.name}
    autoFocus
    onChangeText={this.updateName}
    onEndEditing={this.cancelEdit}
    onSubmitEditing={this.finishEdit}
/>
) : (
    <Text style={AppStyles.valueText}>{this.props.account.get("name") ? this.props.account.get("name") : 'no name'}</Text>
)
}
</View>
    </TouchableOpacity>

    <View>
    <Text style={AppStyles.hintText}>Address</Text>
    <Text selectable style={AppStyles.valueText}>{this.props.account.get("address")}</Text>
    </View>

    <View style={styles.qr}>
<QrView text={this.props.account.get("address")} />
</View>

    <View style={[styles.actionsContainer, AppStyles.buttonContainer]}>
<TouchableOpacity
    style={styles.actionButtonContainer}
    onPress={() => this.props.onChangePin(this.props.account)}
>
<Text style={styles.changePinText}>Change PIN</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.actionButtonContainer}
    onPress={() => this.props.onDelete(this.props.account)}
>
<Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
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