import { TProtocolName } from './protocol';

export type TLendingBorrowingTableItem = {
  id: string;
  assetSymbol: string;
  assetSupplyApys: number[];
  assetSupplyBoostedApys: number[];
  totalApys: number[];
  chainIds: string[];
  protocolNames: TProtocolName[];
};

export type TVaultTableItem = {
  id: string;
  assetSymbol: string;
  assetSupplyApys: string;
  chainIds: string[];
  protocolNames: TProtocolName[];
};

export type TAssetTableItem = {
  id: string;
  assetSymbol: string;
  assetAddress: string;
  assetSupplyApy: string;
  assetSupplyBoostedApy?: string;
  points: string[];
  chainId: string;
  protocolName: TProtocolName;
};

export type TLoopinStrategyTableItem = {
  id: string;
  primaryAsset: string;
  secondaryAsset: string;
  points: string[];
  chainId: string;
  protocolName: TProtocolName;
  apy: string;
};

export type TableItem =
  | TLendingBorrowingTableItem
  | TVaultTableItem
  | TAssetTableItem
  | TLoopinStrategyTableItem;
