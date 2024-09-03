import { Action } from '@/types/strategy';
import { ethers, BytesLike } from 'ethers';
import { TTransactionResponse } from '@/types/transaction';
import { sleep } from './sleep';
import { squidConfig } from '@/config/squid';
import { isBytesLike } from 'ethers/lib/utils';
import { TransactionResponse } from '@0xsquid/sdk/dist/types';
import axios from 'axios';

export const executeSquidTransaction = async (
  signer: ethers.providers.JsonRpcSigner,
  route: TTransactionResponse[number]['tx'],
) => {
  if (isBytesLike(route)) return;

  const squid = await squidConfig();

  const tx = (await squid.executeRoute({ signer, route })) as TransactionResponse;

  await tx.wait();
};

export const executePortalsTransaction = async (
  signer: ethers.providers.JsonRpcSigner,
  url: string,
) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PORTALS_URL}`,
      },
    });

    const tx = await signer.sendTransaction({
      to: response.data.tx.to,
      data: response.data.tx.data,
      gasLimit: '500000',
    });

    await tx.wait();
  } catch (error: any) {
    console.log('error ', error);
    throw new Error(error);
  }
};

export const executeTransaction = async (
  chainId: number,
  signer: ethers.providers.JsonRpcSigner,
  transaction: TTransactionResponse[number],
) => {
  try {
    let currentChain = chainId;

    //* Switch chains if the user is not desired chain
    if (currentChain !== Number(transaction.chain)) {
      //@ts-ignore
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + Number(transaction.chain).toString(16) }],
      });

      currentChain = Number(transaction.chain);

      await sleep(500);
    }

    if (transaction.type === Action.SQUID) {
      await executeSquidTransaction(signer, transaction.tx);
    } else if (transaction.type === Action.PORTALS) {
      await executePortalsTransaction(signer, transaction.tx as string);
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
  } catch (error: any) {
    console.error(error);
  }
};
