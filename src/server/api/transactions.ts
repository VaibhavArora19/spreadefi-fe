import { axiosCompass } from '@/config';
import { walletClient } from '@/config/ethers';
import { TRANSACTIONS } from '@/constants/query';
import { TApiResponse } from '@/types/api';
import { Action, StrategyName } from '@/types/strategy';
import { TTransactionPayload, TTransactionResponse } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from 'wagmi';
import { useDispatch } from 'react-redux';
import { transactionsActions } from '@/redux/actions';
import { useTransactionPayloadStore, useTransactionStore } from '@/redux/hooks';
import { executeTransaction } from '@/helpers/execute';
import { ethers } from 'ethers';
import { networkConfig } from '@/config/network';
import { AAVE_POOL_ABI } from '@/constants/abi/aave';

export const useTransactionsBuilder = (transactionPayload: TTransactionPayload | null) => {
  const dispatch = useDispatch();
  const { leverage } = useTransactionPayloadStore();

  const findATokenAddress = async (
    strategyName: StrategyName,
    tokenAddress: string,
    fromChain: string,
  ) => {
    //@ts-ignore
    const provider = new ethers.providers.JsonRpcProvider(networkConfig[fromChain].rpc);

    const contract = new ethers.Contract(
      //@ts-ignore
      networkConfig[fromChain][strategyName].poolAddress,
      AAVE_POOL_ABI,
      provider,
    );

    const data = await contract.getReserveData(tokenAddress);

    return data[8];
  };

  const fetchTransactions = async () => {
    try {
      console.log('Building transactions...');

      const txPayload: TTransactionPayload = {
        ...(transactionPayload as TTransactionPayload),
      };

      txPayload.txDetails.fromToken = ethers.utils.getAddress(
        txPayload?.txDetails.fromToken as string,
      );

      txPayload.txDetails.toToken = ethers.utils.getAddress(txPayload?.txDetails.toToken as string);

      if (transactionPayload?.strategyName.includes('Looping')) {
        if (leverage) txPayload.txDetails.leverage = leverage / 10;
      }

      if (
        transactionPayload?.action === Action.WITHDRAW ||
        transactionPayload?.action === Action.BORROW
      ) {
        const aTokenAddress = await findATokenAddress(
          transactionPayload?.strategyName as StrategyName,
          transactionPayload?.txDetails.fromToken as string,
          transactionPayload?.txDetails.fromChain as string,
        );

        txPayload.txDetails.fundToken = aTokenAddress;
        txPayload.txDetails.fundAmount = transactionPayload?.txDetails.fromAmount;
      }

      const { data } = await axiosCompass.post<TApiResponse<TTransactionResponse>>(
        '/transaction/prepare',
        txPayload,
      );

      dispatch(transactionsActions.setTransactions(data.data));

      console.log('Transactions built sucessfully...', data);
      return data;
    } catch (error: any) {
      console.error('error: ', error);
      return error;
    }
  };

  return useQuery({
    queryKey: [TRANSACTIONS.FETCH, transactionPayload],
    queryFn: fetchTransactions,
    enabled: !!transactionPayload,
    refetchOnWindowFocus: false,
    refetchInterval: 1800000, //1 minute
  });
};

export const useExecuteTransactions = () => {
  let chainId = useChainId();
  const { transactions } = useTransactionStore();

  const execute = async () => {
    const { signer } = await walletClient();

    for (let i = 0; i < transactions.length; i++) {
      await executeTransaction(chainId, signer, transactions[i]);
    }
  };

  return { execute };
};
