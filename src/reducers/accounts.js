
import {network} from "../util/Constants";
import { asyncRandomBytes } from 'react-native-secure-randombytes'
import safeCrypto from 'react-native-safe-crypto'
import Immutable from 'immutable';
import EthJs from 'ethereumjs-wallet-react-native'

window.randomBytes = asyncRandomBytes
window.scryptsy = safeCrypto.scrypt

const ACTION_ACCOUNT_SET_ACCOUNT = 'ACCOUNT_SET_ACCOUNT';
const ACTION_ACCOUNT_REMOVE_ACCOUNT = 'ACCOUNT_REMOVE_ACCOUNT';
const ACTION_ACCOUNT_SET_ACCOUNT_NAME = 'ACCOUNT_SET_ACCOUNT_NAME';
const ACTION_ACCOUNT_SET_CURRENT_ACCOUNT = 'ACCOUNT_SET_CURRENT_ACCOUNT';


const InitialState = Immutable.fromJS({
    list: {},
    currentAccountId: ""
    });

// actions
export function createAccount(name) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
                EthJs.generate()
                    .then((response)=>{
                        var account = {};
                        account.name = name;
                        account.privateKey = response.getPrivateKeyString();
                        account.publicKey = response.getPublicKeyString();
                        account.address = response.getAddressString();
                        account.balance = 0.0000000000;
                        dispatch(setAccount(account));
                        return resolve(account)
                    })
                    .catch((error)=>{return reject(error)});
    })
    };
}

export function setAccountName(account, name) {
    return {
        type: ACTION_ACCOUNT_SET_ACCOUNT_NAME,
        accountId: account.get("publicKey"),
        name: name
    };
}

function setAccount(account) {
    return {
        type: ACTION_ACCOUNT_SET_ACCOUNT,
        account: account
    };
}

function setCurrentAccount(accountId) {
    return {
        type: ACTION_ACCOUNT_SET_CURRENT_ACCOUNT,
        accountId: accountId
    };
}

function removeAccount(accountId) {
    return {
        type: ACTION_ACCOUNT_REMOVE_ACCOUNT,
        accountId: accountId
    };
}

export function selectAccount(accountId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(setCurrentAccount(accountId));
            return resolve(accountId);
        });
    };
}

export function deleteAccount(accountId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(removeAccount(accountId));
            return resolve(accountId);
        });
    };
}


//https://ropsten.infura.io/fYegUFu9HulgkCPiCTuy
export function createNewAddress(account) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
                dispatch(setAccount(network.endpoint));
        return resolve(account);
    });
    };
}

// reducer
export default function reducer(state = InitialState, action) {

    console.log(action);

    switch (action.type) {

        case ACTION_ACCOUNT_SET_ACCOUNT:
            return state.setIn(['list', action.account.publicKey], Immutable.Map(action.account));

        case ACTION_ACCOUNT_REMOVE_ACCOUNT:
            return state.deleteIn(['list', action.accountId]);

        case ACTION_ACCOUNT_SET_ACCOUNT_NAME:
            return state.setIn(['list', action.accountId, "name"], action.name);

        case ACTION_ACCOUNT_SET_CURRENT_ACCOUNT:
            return state.set('currentAccountId', action.accountId);

    }

    // default
    return state;
}
