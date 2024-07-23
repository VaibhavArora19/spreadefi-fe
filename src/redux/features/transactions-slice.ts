import { TTransactionResponse } from '@/types/transaction';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { transactions: TTransactionResponse } = {
  transactions: [],
};
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    resetState: (state) => {
      state.transactions = [];
    },
  },
});

export default transactionsSlice.reducer;

export const transactionsActions = transactionsSlice.actions;
