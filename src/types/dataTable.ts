import { TProtocolName } from "./protocol";


export type TLendingBorrowingTableItem = {
  id: string;
  asset: string;
  baseAPY: string;
  boostedAPY: string;
  totalAPY: string;
  chains: string[];
  protocols: TProtocolName[];
};
  
export type TVaultTableItem = {
  id: string;
  asset: string;
  baseAPY: string;
  chains: string[];
  protocols: TProtocolName[];
};

export type TAssetTableItem = {
  id: string;
  asset: string;
  totalAPY: string;
  boostedAPY?: string;
  points: string[];
  chains: string[];
  protocols: TProtocolName[];
}
  
export type TableItem = TLendingBorrowingTableItem | TVaultTableItem | TAssetTableItem;
