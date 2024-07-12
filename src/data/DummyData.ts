import { TAssetTableItem, TLendingBorrowingTableItem, TLoopinStrategyTableItem } from '@/types/dataTable';
import { TProtocolName } from '@/types/protocol';

export const AssetTableDummyData: TAssetTableItem[] = [
  {
    id: '0',
    assetSymbol: 'WETH',
    assetSupplyApy: '8.9%',
    assetSupplyBoostedApy: '4.6%',
    chainId: '10',
    protocolName: TProtocolName.AAVE,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '1',
    assetSymbol: 'WETH',
    assetSupplyApy: '6.8%',
    chainId: '42161',
    assetSupplyBoostedApy: '4.6%',
    protocolName: TProtocolName.Balancer,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '2',
    assetSymbol: 'WETH',
    assetSupplyApy: '9.3%',
    chainId: '10',
    assetSupplyBoostedApy: '1.3%',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
] 

export const EthDerivativesDummyData: TAssetTableItem[] = [
  {
    id: '0',
    assetSymbol: 'WETH',
    assetSupplyApy: '8.9%',
    assetSupplyBoostedApy: '4.6%',
    chainId: '10',
    protocolName: TProtocolName.AAVE,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '1',
    assetSymbol: 'WETH',
    assetSupplyApy: '6.8%',
    chainId: '42161',
    assetSupplyBoostedApy: '4.6%',
    protocolName: TProtocolName.Balancer,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '2',
    assetSymbol: 'WETH',
    assetSupplyApy: '9.3%',
    chainId: '10',
    assetSupplyBoostedApy: '1.3%',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
] 

export const LoopingTableDummyData: TLoopinStrategyTableItem[] = [
  {
    id: '0',
    primaryAsset: 'WETH',
    secondaryAsset: "ETH",
    apy: '8.9%',
    chainId: '10',
    protocolName: TProtocolName.AAVE,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '1',
    primaryAsset: 'WETH',
    secondaryAsset: "ezeth",
    apy: '6.8%',
    chainId: '42161',
    protocolName: TProtocolName.Balancer,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '2',
    primaryAsset: 'WETH',
    secondaryAsset: "ETH",
    apy: '9.3%',
    chainId: '10',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '3',
    primaryAsset: 'USDC',
    secondaryAsset: "USDT",
    apy: '9.3%',
    chainId: '10',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
] 

export const MigrateLendingData : TAssetTableItem[] = [
  {
    id: "0",
    assetSymbol: "WETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "10",
    protocolName: TProtocolName.AAVE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "1",
    assetSymbol: "WETH",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "4.6%",
    protocolName: TProtocolName.Balancer,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "2",
    assetSymbol: "WETH",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "3",
    assetSymbol: "WETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "10",
    protocolName: TProtocolName.AAVE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "4",
    assetSymbol: "WETH",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "1.02%",
    protocolName: TProtocolName.Balancer,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "5",
    assetSymbol: "ETH",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "6",
    assetSymbol: "ETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "10",
    protocolName: TProtocolName.AAVE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "7",
    assetSymbol: "ETH",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "4.6%",
    protocolName: TProtocolName.Balancer,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "8",
    assetSymbol: "ETH",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "9",
    assetSymbol: "cbETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "10",
    protocolName: TProtocolName.AAVE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "10",
    assetSymbol: "cbETH",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "1.02%",
    protocolName: TProtocolName.Balancer,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "11",
    assetSymbol: "cbETH",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
 
] 

export const MigrateVaultData : TAssetTableItem[] = [
  {
    id: "0",
    assetSymbol: "USDC",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "8453",
    protocolName: TProtocolName.HOP,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "1",
    assetSymbol: "USDC",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "4.6%",
    protocolName: TProtocolName.NILE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "2",
    assetSymbol: "USDC",
    assetSupplyApy: "9.3%",
    chainId: "8453",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "3",
    assetSymbol: "WETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "8453",
    protocolName: TProtocolName.HOP,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "4",
    assetSymbol: "WETH",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "1.02%",
    protocolName: TProtocolName.NILE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "5",
    assetSymbol: "ETH",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "6",
    assetSymbol: "ETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "10",
    protocolName: TProtocolName.AAVE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "7",
    assetSymbol: "USDT",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "4.6%",
    protocolName: TProtocolName.Balancer,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "8",
    assetSymbol: "USDT",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
  {
    id: "9",
    assetSymbol: "cbETH",
    assetSupplyApy: "8%.9",
    assetSupplyBoostedApy: "4.6%",
    chainId: "8453",
    protocolName: TProtocolName.AAVE,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "10",
    assetSymbol: "cbETH",
    assetSupplyApy: "6.8%",
    chainId: "42161",
    assetSupplyBoostedApy: "1.02%",
    protocolName: TProtocolName.Balancer,
    points: ["ezPoints", "LXP-L"]
  },
  {
    id: "11",
    assetSymbol: "cbETH",
    assetSupplyApy: "9.3%",
    chainId: "10",
    assetSupplyBoostedApy: "1.3%",
    protocolName: TProtocolName.COMPOUND,
    points: ["ezPoints", "LXP-L", ]
  },
 
] 
