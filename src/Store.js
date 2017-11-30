import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
import accounts from './reducers/accounts';

export function configureStore() {
  const reducer = combineReducers({ accounts });

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    var store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk)),
    );
  } else {
    store = createStore(reducer, applyMiddleware(thunk));
  }

  return store;
}
