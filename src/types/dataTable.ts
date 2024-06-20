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
  protocols: TProtocolName[];
};

export type TAssetTableItem = {
  id: string;
  assetSymbol: string;
  totalApys: string;
  assetSupplyBoostedApys?: string;
  points: string[];
  chainIds: string[];
  protocols: TProtocolName[];
};

export type TableItem =
  | TLendingBorrowingTableItem
  | TVaultTableItem
  | TAssetTableItem;
