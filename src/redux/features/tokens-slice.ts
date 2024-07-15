import { Token } from '@0xsquid/squid-types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { tokens: Token[] } = {
  tokens: [],
};

const tokensSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

export default tokensSlice.reducer;

export const tokensActions = tokensSlice.actions;
