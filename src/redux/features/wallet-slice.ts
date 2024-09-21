import { createSlice } from '@reduxjs/toolkit';

const initialState: { isConnected: boolean  } = {
 isConnected : true
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export default walletSlice.reducer;

export const walletActions = walletSlice.actions;
