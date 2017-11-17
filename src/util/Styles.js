import { Platform, StyleSheet } from 'react-native'
import Colors from "../util/Colors"

export default StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    fullscreenView: {
        flex: 1,
        padding: 20
    },
    listView: {
        flex: 1,
    },
    hintText: {
        fontSize: 16,
        color: Colors.Grey70,
        marginBottom: 10,
        marginTop: 10
    },
    hintTextSmall: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10
    },
    valueText: {
        fontSize: 14,
        color: Colors.BlackAlmost,
        fontWeight: 'bold'
    },
    header: {
        fontSize: 14,
        color: Colors.BlackAlmost,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 5,
    },
    valueTextInput: {
        height: 40,
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