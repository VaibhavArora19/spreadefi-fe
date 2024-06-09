import { TProtocolName } from './protocol';

export type TLendingBorrowingTableItem = {
  id: string;
  asset: string;
  assetSupplyApys: number[];
  assetSupplyBoostedApys: number[];
  totalAPY: number[];
  chains: string[];
  protocols: TProtocolName[];
};

export type TVaultTableItem = {
  id: string;
  asset: string;
  assetSupplyApys: string;
  chains: string[];
  protocols: TProtocolName[];
};

export type TAssetTableItem = {
  id: string;
  asset: string;
  totalAPY: string;
  assetSupplyBoostedApys?: string;
  points: string[];
  chains: string[];
  protocols: TProtocolName[];
};

export type TableItem =
  | TLendingBorrowingTableItem
  | TVaultTableItem
  | TAssetTableItem;
