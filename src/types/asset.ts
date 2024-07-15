import { TProtocolName } from './protocol';

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
  RETH = 'reth',
  FRXETH = 'frxeth',
  USDBC = 'usdbc',
  USDCE = 'usdc.e',
  SEAM = 'seam',
  LUSD = 'lusd',
  OP = 'op',
  LINK = 'link',
  FRAX = 'frax',
  DEGEN = 'degen',
  ARB = 'arb',
}

export type TBalance = {
  [contract_address: string]: { price: string };
};

export type TAsset = {
  id: string;
  assetSymbol: string;
  assetSupplyApy: number;
  assetSupplyBoostedApys?: number;
  assetBorrowApy: number;
  points: string[];
  chainId: string;
  assetAddress: string;
  protocolName: TProtocolName;
};

export type TAssetsResponse = {
  points: Array<Array<string>>;
  chainIds: Array<string>;
  protocolNames: Array<string>;
  assetSupplyApys: Array<number>;
  assetSupplyBoostedApys?: Array<number>;
  assetSymbol: string;
  protocolType: string;
};
