import { network } from '../util/Constants';
import Immutable from 'immutable';
import {
  getAccountInfoRequest,
  getTransactionsRequest,
  getTokensRequest,
} from '../util/API';
import Constants from '../util/Constants';
import { getAccounts, setAccounts } from '../util/DB';

const ACTION_ACCOUNT_SET_ACCOUNT = 'ACCOUNT_SET_ACCOUNT';
const ACTION_ACCOUNT_SET_TRANSACTIONS = 'ACCOUNT_SET_TRANSACTIONS';
const ACTION_ACCOUNT_SET_TOKENS = 'ACCOUNT_SET_TOKENS';
const ACTION_ACCOUNT_REMOVE_ACCOUNT = 'ACCOUNT_REMOVE_ACCOUNT';
const ACTION_ACCOUNT_SET_ACCOUNT_NAME = 'ACCOUNT_SET_ACCOUNT_NAME';
const ACTION_ACCOUNT_SET_ACCOUNT_INFO = 'ACCOUNT_SET_ACCOUNT_BALANCE';
const ACTION_ACCOUNT_SET_CURRENT_ACCOUNT = 'ACCOUNT_SET_CURRENT_ACCOUNT';

const InitialState = Immutable.fromJS({
  currentAccountId: '',
});

export function populateAccounts() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      getAccounts()
        .then(accounts => {
          Object.keys(accounts).forEach(address => {
            dispatch(importAccount(address));
            resolve();
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export function importAccount(data) {
  return (dispatch, getState) => {
    var account = {};
    account.name = '';
    account.privateKey = '';
    account.publicKey = '';
    account.address = data;
    account.info = {};
    account.transactions = [];

    return new Promise((resolve, reject) => {
      dispatch(fetchAccountInfo(Immutable.fromJS(account)))
        .then(info => {
          //todo - a little dirty
          account.info = info;
          dispatch(setAccount(Immutable.fromJS(account)));
          return resolve(account);
        })
        .catch(error => {
          console.log(error);
          return reject(error);
        });
    });
  };
}

export function fetchTokens(account) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const address = account.get('address');
      fetch(getTokensRequest(address))
        .then(response => {
          response
            .json()
            .then(data => {
              let tokens = Immutable.fromJS(data.operations);
              dispatch(setTokens(account, tokens));
              return resolve(tokens);
            })
            .catch(error => {
              return reject(error);
            });
        })
        .catch(error => {
          return reject(error);
        });
    });
  };
}

export function fetchTransactions(account) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const address = account.get('address');
      fetch(getTransactionsRequest(address))
        .then(response => {
          console.log(JSON.stringify(response));
          response
            .json()
            .then(data => {
              let transactions = Immutable.fromJS(data);
              dispatch(setTransactions(account, transactions));
              return resolve(transactions);
            })
            .catch(error => {
              return reject(error);
            });
        })
        .catch(error => {
          return reject(error);
        });
    });
  };
}

export function fetchAccountInfo(account) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const address = account.get('address');
      fetch(getAccountInfoRequest(address))
        .then(response => {
          response
            .json()
            .then(data => {
              console.log('fetch balance ' + JSON.stringify(data));
              dispatch(setAccountInfo(account, data));
              return resolve(data);
            })
            .catch(error => {
              return reject(error);
            });
        })
        .catch(error => {
          console.log(error);
          return reject(error);
        });
    });
  };
}

export function setAccountName(account, name) {
  return {
    type: ACTION_ACCOUNT_SET_ACCOUNT_NAME,
    accountId: account.get('address'),
    name: name,
  };
}

export function setAccountInfo(account, info) {
  return {
    type: ACTION_ACCOUNT_SET_ACCOUNT_INFO,
    accountId: account.get('address'),
    info: info,
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
    transactions: transactions,
  };
}

function setTokens(account, tokens) {
  return {
    type: ACTION_ACCOUNT_SET_TOKENS,
    account: account,
    tokens: tokens,
  };
}

function setCurrentAccount(accountId) {
  return {
    type: ACTION_ACCOUNT_SET_CURRENT_ACCOUNT,
    accountId: accountId,
  };
}

function removeAccount(accountId) {
  return {
    type: ACTION_ACCOUNT_REMOVE_ACCOUNT,
    accountId: accountId,
  };
}

export function selectAccount(accountId) {
  return dispatch => {
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
      return resolve(accountId);
    });
  };
}

export function saveAccounts() {
  return (dispatch, getState) => {
    //persist this
    console.log('*****' + JSON.stringify(getState().accounts.get('list')));
    setAccounts(getState().accounts.get('list'));
  };
}

//https://ropsten.infura.io/fYegUFu9HulgkCPiCTuy
export function createNewAddress(account) {
  return dispatch => {
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
      let addedState = state.setIn(
        ['list', action.account.get('address')],
        action.account,
      );
      setAccounts(addedState.get('list'));
      return addedState;

    case ACTION_ACCOUNT_SET_TRANSACTIONS:
      return state.setIn(
        ['list', action.account.get('address'), 'transactions'],
        action.transactions,
      );

    case ACTION_ACCOUNT_SET_TOKENS:
      return state.setIn(
        ['list', action.account.get('address'), 'tokens'],
        action.tokens,
      );

    case ACTION_ACCOUNT_REMOVE_ACCOUNT:
      let deletedState = state.deleteIn(['list', action.accountId]);
      setAccounts(deletedState.get('list'));
      return deletedState;

    case ACTION_ACCOUNT_SET_ACCOUNT_NAME:
      return state.setIn(['list', action.accountId, 'name'], action.name);

    case ACTION_ACCOUNT_SET_ACCOUNT_INFO:
      return state.setIn(['list', action.accountId, 'info'], action.info);

    case ACTION_ACCOUNT_SET_CURRENT_ACCOUNT:
      return state.set('currentAccountId', action.accountId);
  }

  // default
  return state;
}
