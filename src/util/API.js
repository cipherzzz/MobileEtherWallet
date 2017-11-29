import Constants from './Constants';

export function getAccountInfoRequest(address) {
  return (
    Constants.ETHPLORER_ENDPOINT +
    'getAddressInfo/' +
    address +
    '?apiKey=' +
    Constants.ETHPLORER_API_KEY
  );
}

export function getTransactionsRequest(address) {
  return (
    Constants.ETHPLORER_ENDPOINT +
    'getAddressTransactions/' +
    address +
    '?apiKey=' +
    Constants.ETHPLORER_API_KEY
  );
}

export function getTokensRequest(address) {
  return (
    Constants.ETHPLORER_ENDPOINT +
    'getAddressHistory/' +
    address +
    '?apiKey=' +
    Constants.ETHPLORER_API_KEY
  );
}
