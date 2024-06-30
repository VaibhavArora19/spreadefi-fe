export enum TAssetName {
  WETH = 'weth',
  ETH = 'eth',
  EZETH = 'ezeth',
  RSETH = 'rseth',
  CBETH = 'cbeth',
  USDC = 'usdc',
  DAI = 'dai',
  USDT = 'usdt',
  WBTC = 'wbtc',
}

export type TAssetsResponse = {
  points: Array<Array<string>>;
  chainIds: Array<string>;
  protocolNames: Array<string>;
  assetSupplyApys: Array<number>;
  assetSupplyBoostedApys?: Array<number>;
  assetSymbol: string;
  protocolType: string;
};
