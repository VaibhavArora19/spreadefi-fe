import { createWalletClient, custom } from 'viem';

export const walletClient = async (chain: any) => {
  //@ts-ignore
  const [account] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  const client = createWalletClient({
    account,
    chain,
    //@ts-ignore
    transport: custom(window.ethereum!),
  });

  return { client, account };
};
