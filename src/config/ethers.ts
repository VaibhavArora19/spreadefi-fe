import { ethers } from 'ethers';

export const walletClient = async () => {
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

  const signer = provider.getSigner();

  return { provider, signer };
};
