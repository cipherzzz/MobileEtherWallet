
import {network} from "../util/Constants";
import { asyncRandomBytes } from 'react-native-secure-randombytes'
import safeCrypto from 'react-native-safe-crypto'
import EthJs from 'ethereumjs-wallet-react-native'

window.randomBytes = asyncRandomBytes
window.scryptsy = safeCrypto.scrypt

const ACTION_ACCOUNT_CREATE_ADDRESS = 'ACCOUNT_CREATE_ADDRESS';
const ACTION_ACCOUNT_SET_ACCOUNT = 'ACCOUNT_SET_ACCOUNT';
const ACTION_ACCOUNT_SET_WALLET = 'ACCOUNT_SET_WALLET';


const InitialState = {
    account: {},
    wallet: {
        name: "",
        privateKey: "",
        publicKey: "",
        addresses: [],
    }
    };

// actions
export function createWallet() {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
                EthJs.generate()
                    .then((response)=>{

                        var wallet = {};
                        wallet.privateKey = response.getPrivateKeyString();
                        wallet.publicKey = response.getPublicKeyString();
                        wallet.addresses = [{name: "", address: response.getAddressString()}];
                        dispatch(setWallet(wallet));
                        return resolve(wallet)
                    })
                    .catch((error)=>{return reject(error)});
    })
    };
}

function setWallet(wallet) {
    return {
        type: ACTION_ACCOUNT_SET_WALLET,
        wallet: wallet
    };
}

export function setCurrentAccount(account) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(setAccount(account));
            return resolve(account);
        });
    };
}

function setAccount(account) {
    return {
        type: ACTION_ACCOUNT_SET_ACCOUNT,
        account: account
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

    console.log(JSON.stringify(action))

    switch (action.type) {
        case ACTION_ACCOUNT_CREATE_ADDRESS:
            state.status = 'dummy';
            return state;

        case ACTION_ACCOUNT_SET_ACCOUNT:
            state.account = action.account;
            return state;

        case ACTION_ACCOUNT_SET_WALLET:
            return {
                ...state,
                wallet: action.wallet
            }
    }

    // default
    return state;
}
