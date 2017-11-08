

const ACTION_ACCOUNT_CREATE_ADDRESS = 'ACCOUNT_CREATE_ADDRESS';
const ACTION_ACCOUNT_SET_ACCOUNT = 'ACCOUNT_SET_ACCOUNT';


const InitialState = {
    list: [{name: "dummy address", address: "0X123abcd", seed: "1234we", pin: "11234"},
        {name: "dummy address 2", address: "0X123abcd2", seed: "123we4", pin: "123234"},
        {name: "dummy address 3", address: "0X123abcd3", seed: "1234rw", pin: "123423"}],
    account: {}
    };

// actions
function createAddress() {
    return {
        type: ACTION_ACCOUNT_CREATE_ADDRESS,
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

// reducer
export default function reducer(state = InitialState, action) {
    switch (action.type) {
        case ACTION_ACCOUNT_CREATE_ADDRESS:
            state.status = 'dummy';
            return state;

        case ACTION_ACCOUNT_SET_ACCOUNT:
            state.account = action.account;
            return state;
    }

    // default
    return state;
}
