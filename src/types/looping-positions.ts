export type TLoopingStrategy = {
  id: string;
  baseToken: string;
  quoteToken: string;
  chain: string;
  market: string;
  swapMarket: string;
  pair: string;
  liquidationThreshold: number;
  maxLeverage: number;
  roe: number;
  currentPrice: number;
  liquidationPrice: number;
  liquidationBuffer: number;
  activeStatus: boolean;
};

export type TLoopingStrategyQuotePayload = {
  marginType: 'quote' | 'base';
  marginAmount: number;
  positionType: 'long' | 'short';
  leverage: number;
  userAddress: string;
};

export interface TCreatePositionPayload {
  userAddress: string;
  tokenId: number;
  proxyAddress: string;
  strategyId: string;
  marginType: 'base' | 'quote';
  positionType: 'long' | 'short';
  marginAmount: number;
  leverage: number;
  entryPrice: number;
}

export type TQuoteData = {
  entryPrice: number;
  tx: {
    to: string;
    data: string;
  };
};
