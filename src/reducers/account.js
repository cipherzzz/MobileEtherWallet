

const ACTION_ACCOUNT_CREATE_ADDRESS = 'ACCOUNT_CREATE_ADDRESS';


const InitialState = {
    account: {},
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
