import { Action, StrategyName } from './strategy';
import { BytesLike } from 'ethers';
import { Estimate, RouteRequest, SquidData } from '@0xsquid/squid-types';

export type TSquidQuotePayload = {
  fromChain: string;
  fromAmount: string;
  fromToken: string;
  toChain: string;
  toToken: string;
  fromAddress: string;
  toAddress: string;
};

export type TTransactionPayload = {
  strategyName: StrategyName;
  action?: Action;
  txDetails: TSquidQuotePayload & {
    fundToken?: string;
    fundAmount?: string;
    leverage?: number;
    slippage?: number;
    receiveGasOnDestination?: boolean;
  };
};

export type TTransactionResponse = {
  chain: string;
  to: string;
  type: Action;
  tx:
    | BytesLike
    | {
        estimate: Estimate;
        transactionRequest?: SquidData;
        params: RouteRequest;
      };
}[];
