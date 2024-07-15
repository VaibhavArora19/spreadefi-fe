import { TChainConfig } from '@/types/chains';

export const CHAIN_CONFIG: TChainConfig = {
  '8453': {
    chainName: 'Base',
    chainImageUrl: '/assets/icons/chains/base.png',
  },
  '42161': {
    chainName: 'Arbitrum',
    chainImageUrl: '/assets/icons/chains/arbitrum.png',
  },
  '10': {
    chainName: 'OP Mainnet',
    chainImageUrl: '/assets/icons/chains/op.png',
  },
  '59144': {
    chainName: 'Linea',
    chainImageUrl: '/assets/icons/chains/linea.png',
  },
};

export const chainList = [
  {
    chainId: 42161,
    chainName: 'Arbitrum One',
    shortName: 'Arbitrum',
    logo: '/assets/icons/chains/arbitrum.png',
  },
  {
    chainId: 8453,
    chainName: 'Base Mainnet',
    shortName: 'Base',
    logo: '/assets/icons/chains/base.png',
  },
  {
    chainId: 10,
    chainName: 'OP Mainnet',
    shortName: 'Optimism',
    logo: '/assets/icons/chains/op.png',
  },
  {
    chainId: 59144,
    chainName: 'Linea mainnet',
    shortName: 'Linea',
    logo: '/assets/icons/chains/linea.png',
  },
];
