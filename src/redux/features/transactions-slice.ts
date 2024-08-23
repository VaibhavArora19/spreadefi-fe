import { TTransactionResponse } from '@/types/transaction';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { transactions: TTransactionResponse; isLoading: boolean } = {
  transactions: [],
  isLoading: true,
};
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    resetState: (state) => {
      state.transactions = [];
      state.isLoading = true;
    },
  },
});

export default transactionsSlice.reducer;

export const transactionsActions = transactionsSlice.actions;
