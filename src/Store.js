
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
import account from './reducers/account';

export function configureStore() {
  const reducer = combineReducers({account});

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
			applyMiddleware(thunk),
		));
  } else {
    store = createStore(reducer, applyMiddleware(thunk));
  }

  return store;
}
