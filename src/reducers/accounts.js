

const ACTION_ACCOUNT_CREATE_ADDRESS = 'ACCOUNT_CREATE_ADDRESS';


const InitialState = {
    //list: [{name: "dummy address", address: "0X123abcd", seed: "1234we", pin: "11234"},
    //    {name: "dummy address 2", address: "0X123abcd2", seed: "123we4", pin: "123234"},
    //    {name: "dummy address 3", address: "0X123abcd3", seed: "1234rw", pin: "123423"}]
    list: []
    };

// actions
function createAddress() {
    return {
        type: ACTION_ACCOUNT_CREATE_ADDRESS,
    };
}

// reducer
export default function reducer(state = InitialState, action) {
    switch (action.type) {
        case ACTION_ACCOUNT_CREATE_ADDRESS:
            state.account.status = 'dummy';
            return state;
    }

    // default
    return state;
}
