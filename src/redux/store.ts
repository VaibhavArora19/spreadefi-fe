import { configureStore } from '@reduxjs/toolkit';
import loopingStrategyReducer from './features/looping-strategy-slice';
import tokensReducer from './features/tokens-slice';
import transactionPayloadReducer from './features/transaction-payload-slice';
import transactionsReducer from './features/transactions-slice';
import walletReducer from './features/wallet-slice';

export const store = configureStore({
  reducer: {
    transactionPayload: transactionPayloadReducer,
    transactions: transactionsReducer,
    tokens: tokensReducer,
    wallet: walletReducer,
    lopingStrategy: loopingStrategyReducer,
  },
});
