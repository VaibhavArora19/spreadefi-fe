import { configureStore } from '@reduxjs/toolkit';
import transactionPayloadReducer from './features/transaction-payload-slice';
import transactionsReducer from './features/transactions-slice';
import tokensReducer from './features/tokens-slice';

export const store = configureStore({
  reducer: {
    transactionPayload: transactionPayloadReducer,
    transactions: transactionsReducer,
    tokens: tokensReducer,
  },
});
