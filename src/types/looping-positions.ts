export type TLoopingPosition = {
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

export type TLoopingPositionsResponse = Array<TLoopingPosition>;
