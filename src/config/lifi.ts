import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  fantom,
  linea,
  optimism,
  polygon,
  scroll,
} from 'viem/chains';
import { ChainId, createConfig, EVM } from '@lifi/sdk';
import { Chain, createWalletClient, getAddress, http } from 'viem';
import { walletClient } from './viem';

export const lifiConfig = async (currentChain: number) => {
  const chains = [arbitrum, optimism, base, linea, bsc, polygon, fantom, avalanche, scroll, blast];

  const { client, account } = await walletClient(chains.find((chain) => chain.id === currentChain));

  createConfig({
    integrator: 'Spreadefi',
    rpcUrls: {
      [ChainId.ARB]: [process.env.NEXT_PUBLIC_ARB_RPC as string],
      [ChainId.OPT]: [process.env.NEXT_PUBLIC_OP_RPC as string],
      [ChainId.BAS]: [process.env.NEXT_PUBLIC_BASE_RPC as string],
      [ChainId.FTM]: [process.env.NEXT_PUBLIC_FANTOM_RPC as string],
      [ChainId.AVA]: [process.env.NEXT_PUBLIC_AVALANCHE_RPC as string],
      [ChainId.POL]: [process.env.NEXT_PUBLIC_POLYGON_RPC as string],
      [ChainId.LNA]: [process.env.NEXT_PUBLIC_LINEA_RPC as string],
      [ChainId.BSC]: [process.env.NEXT_PUBLIC_BSC_RPC as string],
      [ChainId.SCL]: [process.env.NEXT_PUBLIC_SCROLL_RPC as string],
      [ChainId.BLS]: [process.env.NEXT_PUBLIC_BLAST_RPC as string],
    },
    providers: [
      EVM({
        getWalletClient: async () => client,
        switchChain: async (chainId) =>
          // Switch chain by creating a new wallet client
          createWalletClient({
            account: account,
            chain: chains.find((chain) => chain.id == chainId) as Chain,
            transport: http(),
          }),
      }),
    ],
  });
};
