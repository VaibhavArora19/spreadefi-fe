import { Action } from '@/types/strategy';
import { ethers, BytesLike } from 'ethers';
import { TTransactionResponse } from '@/types/transaction';
import { sleep } from './sleep';
import { squidConfig } from '@/config/squid';
import { isBytesLike } from 'ethers/lib/utils';
import { TransactionResponse } from '@0xsquid/sdk/dist/types';

export const executeSquidTransaction = async (
  signer: ethers.providers.JsonRpcSigner,
  route: TTransactionResponse[number]['tx'],
) => {
  if (isBytesLike(route)) return;

  const squid = await squidConfig();

  const tx = (await squid.executeRoute({ signer, route })) as TransactionResponse;

  await tx.wait();
};

export const executeTransaction = async (
  chainId: number,
  signer: ethers.providers.JsonRpcSigner,
  transaction: TTransactionResponse[number],
) => {
  let currentChain = chainId;

  //* Switch chains if the user is not desired chain
  if (currentChain !== Number(transaction.chain)) {
    //@ts-ignore
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + Number(transaction.chain).toString(16) }],
    });

    currentChain = Number(transaction.chain);
  }

  if (transaction.type === Action.SQUID) {
    await executeSquidTransaction(signer, transaction.tx);
  } else {
    const tx = {
      to: transaction.to,
      data: transaction.tx as string,
      gasLimit: '500000',
    };

    const txResponse = await signer.sendTransaction(tx);

    await txResponse.wait();
  }

  await sleep(1000);
};
