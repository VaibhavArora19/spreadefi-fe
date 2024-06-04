import { TAssetTableItem, TLendingBorrowingTableItem } from "@/types/dataTable";
import { TProtocolName } from "@/types/protocol";

export const LendingBorrowingDummyData: TLendingBorrowingTableItem[] = [
    {
      id: "0",
      asset: "WETH",
      baseAPY: "1.5% - 3.5%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["42161", "10"],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer, TProtocolName.COMPOUND],
    },
    {
      id: "1",
      asset: "ezETH",
      baseAPY: "2.1% - 2.4%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["8453",],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer],
    },
    {
      id: "2",
      asset: "ETH",
      baseAPY: "1.5% - 3.5%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["42161"],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer, TProtocolName.COMPOUND],
    },
    {
      id: "3",
      asset: "WETH",
      baseAPY: "1.5% - 3.5%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["10"],
      protocols: [TProtocolName.COMPOUND],
    },
    {
      id: "4",
      asset: "ezETH",
      baseAPY: "4.1% - 6.4%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["8453", "42161", "10"],
      protocols: [TProtocolName.AAVE,TProtocolName.COMPOUND, TProtocolName.Balancer],
    },
  ];
  
export const ValultDummyData: TLendingBorrowingTableItem[] = [
    {
      id: "0",
      asset: "WETH",
      baseAPY: "9.5% - 13.5%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["42161", "10"],
      protocols: [TProtocolName.AAVE],
    },
    {
      id: "2",
      asset: "ETH",
      baseAPY: "1.5% - 3.5%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["42161"],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer, TProtocolName.COMPOUND],
    },
    {
      id: "3",
      asset: "WETH",
      baseAPY: "9.5% - 13.5%",
      boostedAPY: "2.2% - 4.2%",
      totalAPY: "6.8% - 9.3%",
      chains: ["42161", "10"],
      protocols: [TProtocolName.AAVE],
    },
  ];
  
export const AssetTableDummyData : TAssetTableItem[] = [
  {
    id: "0",
    asset: "WETH",
    totalAPY: "8%.9",
    boostedAPY: "4.6%",
    chains: [ "10"],
    protocols: [TProtocolName.AAVE],
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "1",
    asset: "WETH",
    totalAPY: "6.8%",
    chains: ["42161"],
    protocols: [TProtocolName.Balancer],
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "2",
    asset: "WETH",
    totalAPY: "9.3%",
    chains: ["10"],
    boostedAPY: "1.3%",
    protocols: [TProtocolName.COMPOUND],
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "3",
    asset: "WETH",
    totalAPY: "8%.9",
    boostedAPY: "4.6%",
    chains: [ "10"],
    protocols: [TProtocolName.AAVE],
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "4",
    asset: "WETH",
    totalAPY: "6.8%",
    chains: ["42161"],
    protocols: [TProtocolName.Balancer],
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "5",
    asset: "WETH",
    totalAPY: "9.3%",
    chains: ["10"],
    boostedAPY: "1.3%",
    protocols: [TProtocolName.COMPOUND],
    points: ["ezPoints", "LXP-L", ]
  },
 
] 