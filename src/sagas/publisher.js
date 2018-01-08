import { put, takeEvery, apply } from 'redux-saga/effects';
import 'babel-polyfill';
import { Registry } from 'ethereum-tcr-api';
import Faucet from '../faucet';

export function * buyTokens (action) {
  let faucet = new Faucet();

  yield apply(faucet, 'purchaseTokens', [action.tokens]);

  yield put({ type: 'BUY_TOKENS_COMPLETE' });
  yield put({ type: 'REQUEST_TOKEN_INFORMATION' });
}

export function * fetchTokenInformation (action) {
  if (!window.Web3.eth.defaultAccount) {
    return;
  }

  let registry = new Registry(window.contracts.registry, window.Web3);
  let account = yield apply(registry, 'getAccount', [window.Web3.eth.defaultAccount]);

  let tokens = yield apply(account, 'getTokenBalance');
  let ethers = yield apply(account, 'getEtherBalance');

  yield put({ type: 'UPDATE_TOKEN_INFORMATION', tokens, ethers });
}

export function * sendTestTxs (action) {
  let registry = new Registry(window.contracts.registry, window.Web3);
  let account = yield apply(registry, 'getAccount', [window.Web3.eth.defaultAccount]);

  let transactions = [
    {
      label: 'Approve 150 Tokens',
      content: 'In order to complete further actions with application you have to allow it to use certain amount of your tokens for further usage without your permission.',
      processed: true,
      exception: false,
      action: () => account.tokenContract.methods.transfer(window.Web3.eth.defaultAccount, 10).send({from: window.Web3.eth.defaultAccount})
    },
    {
      label: 'Commit your vote',
      content: 'Committing a vote is a first and essential step which involves you into voting process.',
      processed: false,
      exception: false,
      action: () => account.tokenContract.methods.transfer(window.Web3.eth.defaultAccount, 10).send({from: window.Web3.eth.defaultAccount})
    },
    {
      label: 'Reveal your vote',
      content: 'Revealing a vote is the last step of the voting process which make visible all the votes.',
      processed: false,
      exception: false,
      action: () => account.tokenContract.methods.transfer(window.Web3.eth.defaultAccount, 10).send({from: window.Web3.eth.defaultAccount})
    }
  ];

  yield put({ type: 'SEND_TRANSACTIONS', transactions });
}

export default function * flow () {
  yield takeEvery('BUY_TOKENS', buyTokens);
  yield takeEvery('REQUEST_TOKEN_INFORMATION', fetchTokenInformation);
  yield takeEvery('SEND_TEST_TXS', sendTestTxs);
}
