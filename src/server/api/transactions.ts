import { axiosCompass } from '@/config';
import { walletClient } from '@/config/ethers';
import { TRANSACTIONS } from '@/constants/query';
import { TApiResponse } from '@/types/api';
import { Action } from '@/types/strategy';
import { TTransactionPayload, TTransactionResponse } from '@/types/transaction';
import { useQuery } from '@tanstack/react-query';
import { useChainId } from 'wagmi';
import { useDispatch } from 'react-redux';
import { transactionsActions } from '@/redux/actions';
import { useTransactionStore } from '@/redux/hooks';
import { executeTransaction } from '@/helpers/execute';

export const useTransactionsBuilder = (transactionPayload: TTransactionPayload | null) => {
  const dispatch = useDispatch();

  const fetchTransactions = async () => {
    try {
      const { data } = await axiosCompass.post<TApiResponse<TTransactionResponse>>(
        '/transaction/prepare',
        transactionPayload,
      );

      dispatch(transactionsActions.setTransactions(data.data));

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
    refetchInterval: 60000, //1 minute
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
