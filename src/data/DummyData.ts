import { TAssetTableItem, TLendingBorrowingTableItem } from '@/types/dataTable';
import { TProtocolName } from '@/types/protocol';

export const AssetTableDummyData: TAssetTableItem[] = [
  {
    id: '0',
    assetSymbol: 'WETH',
    assetSupplyApy: '8.9%',
    assetSupplyBoostedApys: '4.6%',
    chainId: '10',
    protocolName: TProtocolName.AAVE,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '1',
    assetSymbol: 'WETH',
    assetSupplyApy: '6.8%',
    chainId: '42161',
    assetSupplyBoostedApys: '4.6%',
    protocolName: TProtocolName.Balancer,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '2',
    assetSymbol: 'WETH',
    assetSupplyApy: '9.3%',
    chainId: '10',
    assetSupplyBoostedApys: '1.3%',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '3',
    assetSymbol: 'WETH',
    assetSupplyApy: '8%.9',
    assetSupplyBoostedApys: '4.6%',
    chainId: '10',
    protocolName: TProtocolName.AAVE,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '4',
    assetSymbol: 'WETH',
    assetSupplyApy: '6.8%',
    chainId: '42161',
    assetSupplyBoostedApys: '1.02%',
    protocolName: TProtocolName.Balancer,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '5',
    assetSymbol: 'WETH',
    assetSupplyApy: '9.3%',
    chainId: '10',
    assetSupplyBoostedApys: '1.3%',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
];

export const EthDerivativesDummyData: TAssetTableItem[] = [
  {
    id: '0',
    assetSymbol: 'WETH',
    assetSupplyApy: '8%.9',
    assetSupplyBoostedApys: '4.6%',
    chainId: '10',
    protocolName: TProtocolName.AAVE,
    points: ['ezPoints', 'LXP-L'],
  },
  {
    id: '1',
    assetSymbol: 'cbETH',
    assetSupplyApy: '6.8%',
    chainId: '42161',
    protocolName: TProtocolName.Balancer,
    points: ['ezPoints', 'LXP-L'],
    assetSupplyBoostedApys: '1.32%',
  },
  {
    id: '2',
    assetSymbol: 'rsETH',
    assetSupplyApy: '9.3%',
    chainId: '10',
    assetSupplyBoostedApys: '1.3%',
    protocolName: TProtocolName.COMPOUND,
    points: ['ezPoints', 'LXP-L'],
  },
];
