import { TAssetTableItem, TLendingBorrowingTableItem } from "@/types/dataTable";
import { TProtocolName } from "@/types/protocol";

export const LendingBorrowingDummyData: TLendingBorrowingTableItem[] = [
    {
      id: "0",
      asset: "WETH",
      baseAPY: [1.4, 3.4, 6.2, 8.9],
      boostedAPY:[0.2, 1.2, 1.4, 1.6],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["42161", "10"],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer, TProtocolName.COMPOUND],
    },
    {
      id: "1",
      asset: "ezETH",
      baseAPY: [1.1, 3.4, 6.2, 9.1],
      boostedAPY: [0.3, 1.2, 1.4, 1.9],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["8453",],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer],
    },
    {
      id: "2",
      asset: "ETH",
      baseAPY: [1.2, 1.2, 1.4, 1.6, 3.2],
      boostedAPY:[0.1, 1.2, 1.4, 1.5],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["42161"],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer, TProtocolName.COMPOUND],
    },
    {
      id: "3",
      asset: "WETH",
      baseAPY: [1.5, 1.2, 1.4, 1.6, 8.2],
      boostedAPY: [1.4, 1.6, 2.4, 3.6, 4.2],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["10"],
      protocols: [TProtocolName.COMPOUND],
    },
    {
      id: "4",
      asset: "ezETH",
      baseAPY: [1.4, 3.4, 6.2, 8.9],
      boostedAPY:[0.2, 1.2, 1.4, 1.6],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["8453", "42161", "10"],
      protocols: [TProtocolName.AAVE,TProtocolName.COMPOUND, TProtocolName.Balancer],
    },
  ];
  
export const ValultDummyData: TLendingBorrowingTableItem[] = [
    {
      id: "0",
      asset: "WETH",
      baseAPY: [1.4, 3.4, 6.2, 8.9],
      boostedAPY:[0.2, 1.2, 1.4, 1.6],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["42161", "10"],
      protocols: [TProtocolName.AAVE],
    },
    {
      id: "2",
      asset: "ETH",
      baseAPY: [1.1, 3.4, 6.2, 9.1],
      boostedAPY: [0.3, 1.2, 1.4, 1.9],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
      chains: ["42161"],
      protocols: [TProtocolName.AAVE, TProtocolName.Balancer, TProtocolName.COMPOUND],
    },
    {
      id: "3",
      asset: "WETH",
      baseAPY: [1.4, 3.4, 6.2, 8.9],
      boostedAPY:[0.2, 1.2, 1.4, 1.6],
      totalAPY: [1.4, 3.4, 6.2, 8.9],
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

export const EthDerivativesDummyData : TAssetTableItem[] = [
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
    asset: "cbETH",
    totalAPY: "6.8%",
    chains: ["42161"],
    protocols: [TProtocolName.Balancer],
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "2",
    asset: "rsETH",
    totalAPY: "9.3%",
    chains: ["10"],
    boostedAPY: "1.3%",
    protocols: [TProtocolName.COMPOUND],
    points: ["ezPoints", "LXP-L", ]
  },
] 