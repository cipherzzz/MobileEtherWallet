
import {network} from "../util/Constants";
import Immutable from 'immutable';
import {getBalanceRequest, getTransactionsRequest} from "../util/API"
import Constants from "../util/Constants";
import {getAccounts, setAccounts} from "../util/DB";

const ACTION_ACCOUNT_SET_ACCOUNT = 'ACCOUNT_SET_ACCOUNT';
const ACTION_ACCOUNT_SET_TRANSACTIONS = 'ACCOUNT_SET_TRANSACTIONS';
const ACTION_ACCOUNT_REMOVE_ACCOUNT = 'ACCOUNT_REMOVE_ACCOUNT';
const ACTION_ACCOUNT_SET_ACCOUNT_NAME = 'ACCOUNT_SET_ACCOUNT_NAME';
const ACTION_ACCOUNT_SET_ACCOUNT_BALANCE = 'ACCOUNT_SET_ACCOUNT_BALANCE';
const ACTION_ACCOUNT_SET_CURRENT_ACCOUNT = 'ACCOUNT_SET_CURRENT_ACCOUNT';

const InitialState = Immutable.fromJS({
    //list: {
    //    "0x6E1916C1315b1600232523cF58c726A2F224cCE9": {
    //        name: "MEW",
    //        privateKey: "privatekey",
    //        publicKey: "publickey",
    //        address: Constants.MEW_ADDRESS,
    //        balance: "0",
    //        transactions: []
    //    }
    //},
    //list: getAccountKeys(),
    currentAccountId: ""
    });

export function populateAccounts() {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            getAccounts()
                .then((accounts)=>{
                    Object.keys(accounts).forEach((address)=>{
                        dispatch(importAccount(address));
                        resolve();
                    })
                })
                .catch((error)=>{reject(error)});
        })
    };
}

export function importAccount(data) {
    return (dispatch, getState) => {

        var account = {};
        account.name = "";
        account.privateKey = "";
        account.publicKey = "";
        account.address = data;
        account.balance = 0.0000000000;
        account.transactions = [];

        return new Promise((resolve, reject) => {

            dispatch(fetchBalance(Immutable.fromJS(account)))
                .then((balance)=>{

                    //todo - a little dirty
                    account.balance = balance;
                    dispatch(setAccount(Immutable.fromJS(account)));

                    //persist this
                    setAccounts(getState().accounts.get("list"));

                    return resolve(account)
                })
                .catch((error)=>{
                    console.log(error)
                    return reject(error)
                });
        })
    };
}

export function fetchTransactions(account) {

    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const address = account.get("address");
            fetch(getTransactionsRequest(address))
                .then((response)=>{
                    response.json()
                        .then((data)=>{
                            let transactions = Immutable.fromJS(data.result);
                            dispatch(setTransactions(account, transactions));
                            return resolve(transactions)
                        })
                        .catch((error)=>{return reject(error)});
                })
                .catch((error)=>{return reject(error)});
        })
    };
}

export function fetchBalance(account) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const address = account.get("address");
            fetch(getBalanceRequest(address))
                .then((response)=>{
                    response.json()
                            .then((data)=>{
                                console.log("fetch balance "+JSON.stringify(data));
                                let balance = data.result;
                                dispatch(setAccountBalance(account, balance));
                                return resolve(balance)
                            })
                            .catch((error)=>{
                                return reject(error)
                            });
                })
                .catch((error)=>{
                    console.log(error)
                    return reject(error)
                });
        })
    };
}

export function setAccountName(account, name) {
    return {
        type: ACTION_ACCOUNT_SET_ACCOUNT_NAME,
        accountId: account.get("address"),
        name: name
    };
}

export function setAccountBalance(account, balance) {
    return {
        type: ACTION_ACCOUNT_SET_ACCOUNT_BALANCE,
        accountId: account.get("address"),
        balance: balance
    };
}

function setAccount(account) {
    return {
        type: ACTION_ACCOUNT_SET_ACCOUNT,
        account: account,
    };
}

function setTransactions(account, transactions) {
    return {
        type: ACTION_ACCOUNT_SET_TRANSACTIONS,
        account: account,
        transactions: transactions
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

    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {
            dispatch(removeAccount(accountId));

            console.log("HERe******"+JSON.stringify(getState().accounts.get("list")));

            //persist this
            setAccounts(getState().accounts.get("list"));

            return resolve();
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
            return state.setIn(['list', action.account.get("address")], action.account);

        case ACTION_ACCOUNT_SET_TRANSACTIONS:
            return state.setIn(['list', action.account.get("address"), "transactions"], action.transactions);

        case ACTION_ACCOUNT_REMOVE_ACCOUNT:
            return state.deleteIn(['list', action.accountId]);

        case ACTION_ACCOUNT_SET_ACCOUNT_NAME:
            return state.setIn(['list', action.accountId, "name"], action.name);

        case ACTION_ACCOUNT_SET_ACCOUNT_BALANCE:
            return state.setIn(['list', action.accountId, "balance"], action.balance);

        case ACTION_ACCOUNT_SET_CURRENT_ACCOUNT:
            return state.set('currentAccountId', action.accountId);

    }

    // default
    return state;
}
