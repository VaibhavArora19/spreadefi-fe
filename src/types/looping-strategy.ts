import { Route } from '@lifi/sdk';

export type PositionType = 'Long' | 'Short';
export type MarginType = 'Base' | 'Quote';
export type Status = 'Open' | 'Closed';
export type ModifyType = 'add' | 'remove' | 'close';

export type TLoopingStrategy = {
  id: string;
  baseToken: string;
  quoteToken: string;
  chain: string;
  market: string;
  swapMarket: string;
  pair: string;
  liquidationThreshold: number | null;
  maxLeverage: number | null;
  roe: number;
  currentPrice: number;
  liquidationPrice: number;
  liquidationBuffer: number;
  activeStatus: boolean;
  positionType: PositionType | null;
  apr?: number;
  apy?: number;
  borrowingRate?: number;
  lendingRate?: number;
  interestRate?: number;
};

export type TLoopingStrategyQuotePayload = {
  marginType: MarginType;
  marginAmount: number;
  positionType?: PositionType;
  leverage: number;
  userAddress: `0x${string}`;
};

export type TLoopingStrategyLiFiQuotePayload = TLoopingStrategyQuotePayload & {
  fromChain: string;
  toChain: string;
  fromToken: string;
};

export interface TCreatePositionPayload {
  userAddress: string;
  tokenId: number;
  proxyAddress: string;
  strategyId: string;
  marginType: MarginType;
  positionType?: PositionType;
  marginAmount: number;
  leverage: number;
  entryPrice: number;
}

export type TCreateLiFiPositionPayload = Omit<
  TCreatePositionPayload,
  'tokenId' | 'proxyAddress'
> & {
  fromChain: number;
  toChain: number;
  txHash: string;
};

export type TQuoteData = {
  entryPrice: number;
  txs: {
    approveTx: {
      to: string;
      data: `0x${string}`;
    } | null;
    tx: {
      to: string;
      data: string;
    };
  };
};

export type TLifiQuoteData = {
  quote: TQuoteData;
  lifiRoute: Route;
};

export type TUserLoopingPosition = {
  id: string;
  proxyAddress: string;
  userAddress: string;
  strategyId: string;
  positionType: PositionType;
  marginType: MarginType;
  marginAmount: number;
  leverage: number;
  entryPrice: number;
  currentPrice: number;
  roe: number;
  yoyReturn: number;
  liquidationPrice: number;
  pnl: number;
  status: Status;
  Strategy: TLoopingStrategy;
};

export type TUserLoopingPositionResponse = TUserLoopingPosition & {
  // Strategy: TLoopingStrategy;
  collateralAmount: number;
  debtAmount: number;
  collateralValueUSD: number;
  debtValueUSD: number;
  marginValueUSD: number;
  liquidationThreshold: number;
  liquidationBuffer: number;
};

export type TModifyPositionPayload = {
  marginAmount?: number;
  modifyType: ModifyType;
  leverage?: number;
};

export type TModifyPositionResponse = {
  txs: {
    approveTx: {
      to: string;
      data: `0x${string}`;
    } | null;
    tx: {
      to: string;
      data: string;
    };
  };
  newEntryPrice?: number;
  newLiquidationPrice?: number;
  newLiquidationBuffer?: number;
  totalMarginAmount?: number;
  roe?: number;
};

export type TUpdatePositionEntryPayload = {
  modifyType: ModifyType;
  totalMarginAmount?: number;
  leverage?: number;
  newEntryPrice?: number;
  newLiquidationPrice?: number;
};
