import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
    view: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        marginBottom: 50,
        padding: 20
    },
    fullscreenView: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        padding: 20
    },
    listView: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 64 : 54,
        marginBottom: 50
    },
    hintText: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 10,
        marginTop: 10
    },
    hintTextSmall: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10
    },
    valueText: {
        fontSize: 12,
        color: 'black',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    valueTextInput: {
        height: 35,
        padding: 5,
        marginTop: -5
    },
    inputValue: {
        color: 'black',
        marginBottom: 20,
        height: 40
    },
    inputValueSmall: {
        fontSize: 12
    },
    pin: {
        color: 'black',
        height: 70,
        width: 300,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 65
    },
    icon: {
        height: 100,
        width: 100,
        marginBottom: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#eee'
    }
})