/**
 * Util
 * LiveOakMobile
 *
 * Created by macuser on 11/30/17
 * Copyright (c) 2015 Live Oak Bank. All rights reserved.
 */

export function getValueForTransaction(transaction) {
  const tokenInfo = transaction.getIn(['tokenInfo']);

  let value = Number(transaction.get('value'));
  if (tokenInfo) {
    value = Number(value) / 10 ** Number(tokenInfo.get('decimals'));
  }

  return value.toFixed(4);
}
