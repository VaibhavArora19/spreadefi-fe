import { lifiConfig } from '@/config/lifi';
import { squidConfig } from '@/config/squid';
import { Action } from '@/types/strategy';
import { SquidRoute, TTransactionResponse } from '@/types/transaction';
import { TransactionResponse } from '@0xsquid/sdk/dist/types';
import { executeRoute, Route } from '@lifi/sdk';
import axios from 'axios';
import { ethers } from 'ethers';
import { isBytesLike } from 'ethers/lib/utils';
import { sleep } from './sleep';

export const executeSquidTransaction = async (
  signer: ethers.providers.JsonRpcSigner,
  route: SquidRoute,
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
    console.log('error ', error.response.data.message);
    throw new Error(error);
  }
};

export const executeLifiTransaction = async (
  chainId: number,
  route: Route,
  onTxHashGenerated?: (txHash: string) => void,
) => {
  await lifiConfig(chainId);

  let isTxHashGenerated = false;

  await executeRoute(route, {
    updateRouteHook(route) {
      if (isTxHashGenerated || !onTxHashGenerated) return;

      const txHashSourceChain = route.steps[0].execution?.process[1]?.txHash;

      if (txHashSourceChain) {
        isTxHashGenerated = true;
        onTxHashGenerated(txHashSourceChain); // Call the callback function
      }
    },
    async acceptExchangeRateUpdateHook({ toToken, oldToAmount, newToAmount }) {
      console.log(
        `Exchange rate updated, with old toAmount: ${oldToAmount} and new toAmount: ${newToAmount}`,
      );
      return true;
    },
  });
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
      await executeSquidTransaction(signer, transaction.tx as SquidRoute);
    } else if (transaction.type === Action.LIFI) {
      await executeLifiTransaction(chainId, transaction.tx as Route);
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
    throw new Error(error);
  }
};
