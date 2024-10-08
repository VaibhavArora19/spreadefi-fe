import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  strategyHref: string;
}

const initialState: InitialState = {
  strategyHref: '',
};

const loopingStrategySlice = createSlice({
  name: 'loopingStrategy',
  initialState,
  reducers: {
    setStrategyHref: (state, action: PayloadAction<string>) => {
      state.strategyHref = action.payload;
    },
  },
});

export default loopingStrategySlice.reducer;

export const loopingStrategyActions = loopingStrategySlice.actions;
