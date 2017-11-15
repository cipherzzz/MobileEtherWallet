import Constants from "./Constants";

export function getBalanceRequest(address) {
    return Constants.ETHER_SCAN_ENDPOINT+"api?module=account" +
        "&action=balance&address="+address+"&tag=latest&apikey="+Constants.ETHER_SCAN_API_KEY;
}

export function getTransactionsRequest(address) {
    return Constants.ETHER_SCAN_ENDPOINT+"api?module=account&action=txlist&address="+address
        +"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+Constants.ETHER_SCAN_API_KEY;
}