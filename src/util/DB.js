/**
 * DB
 * LiveOakMobile
 *
 * Created by macuser on 11/21/17
 * Copyright (c) 2015 Live Oak Bank. All rights reserved.
 */

import store from 'react-native-simple-store';

export function getAccounts() {
  return new Promise((resolve, reject) => {
    store
      .get('accounts')
      .then(accounts => {
        if (accounts) {
          return resolve(accounts);
        } else {
          store.save('accounts', {}).then(() => {
            resolve({});
          });
        }
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function setAccounts(accounts) {
  return new Promise((resolve, reject) => {
    store
      .save('accounts', accounts)
      .then(accounts => {
        return resolve(accounts);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

//export function setAccounts(accounts) {
//    alert(JSON.stringify(accounts));
//    store.save('accounts', accounts);
//}
