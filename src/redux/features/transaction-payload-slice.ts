import { StrategyName } from '@/types/strategy';
import { TTransactionPayload, TTransactionResponse } from '@/types/transaction';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TTransactionPayload['txDetails'] & {
  strategyName: StrategyName | '';
  fromTokenDecimals: number;
} = {
  strategyName: '',
  fromChain: '',
  fromAmount: '',
  fromToken: '',
  fromTokenDecimals: 0,
  toChain: '',
  toToken: '',
  fromAddress: '',
  toAddress: '',
  leverage: 0,
  slippage: 0,
  receiveGasOnDestination: false,
};

const transactionPayloadSlice = createSlice({
  name: 'transactionPayload',
  initialState,
  reducers: {
    setStrategyName: (state, action) => {
      state.strategyName = action.payload;
    },
    setFromChain: (state, action) => {
      state.fromChain = action.payload;
    },
    setFromAmount: (state, action) => {
      state.fromAmount = action.payload;
    },
    setFromToken: (state, action) => {
      state.fromToken = action.payload;
    },
    setToChain: (state, action) => {
      state.toChain = action.payload;
    },
    setToToken: (state, action) => {
      state.toToken = action.payload;
    },
    setFromAddress: (state, action) => {
      state.toAddress = action.payload;
    },
    setFromTokenDecimals: (state, action) => {
      state.fromTokenDecimals = action.payload;
    },
    setLeverage: (state, action) => {
      state.leverage = action.payload;
    },
    setSlippage: (state, action) => {
      state.slippage = action.payload;
    },
    setReceiveGasOnDestination: (state, action) => {
      state.receiveGasOnDestination = action.payload;
    },
    resetState: (state) => {
      state.strategyName = '';
      state.fromChain = '';
      state.fromAmount = '';
      state.fromToken = '';
      state.fromTokenDecimals = 0;
      state.toChain = '';
      state.toToken = '';
      state.fromAddress = '';
      state.toAddress = '';
      state.fundAmount = '';
      state.fundToken = '';
      state.leverage = 0;
      state.slippage = 0;
      state.receiveGasOnDestination = false;
    },
  },
});

export default transactionPayloadSlice.reducer;

export const transactionPayloadActions = transactionPayloadSlice.actions;
