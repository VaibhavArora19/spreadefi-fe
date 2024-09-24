import { axiosLoopingPositions } from '@/config';
import { LOOPING_STRATEGY } from '@/constants/query';
import {
  TCreatePositionPayload,
  TLoopingStrategy,
  TLoopingStrategyQuotePayload,
} from '@/types/looping-positions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { decodeAbiParameters, parseAbiParameters, parseEther } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

export const useFetchLoopingStrategies = () => {
  const fetchPositions = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TLoopingStrategy[]>('/strategy');

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH],
    queryFn: fetchPositions,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useFetchLoopingStrategyById = (strategyId: string, enabled?: boolean) => {
  const fetchPositionById = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TLoopingStrategy>(`/strategy/${strategyId}`);

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH_BY_ID],
    queryFn: fetchPositionById,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export const useGetLoopingStrategyQuote = (strategyId: string) => {
  const fetchQuote = async (payload: TLoopingStrategyQuotePayload) => {
    try {
      const { data } = await axiosLoopingPositions.post<TLoopingStrategy>(
        `/strategy/${strategyId}/quote`,
        payload,
      );

      console.log('hellowowow', data);
      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  function onSuccess(data: any) {}

  function onError(error: any) {}

  return useMutation({
    mutationKey: [LOOPING_STRATEGY.FETCH_QUOTE_BY_ID],
    mutationFn: fetchQuote,
    onSuccess,
    onError,
    retry: 0,
  });
};

export const useCreateLoopingPosition = () => {
  const createPosition = async (payload: TCreatePositionPayload) => {
    try {
      const { data } = await axiosLoopingPositions.put('/api/positions', payload);

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useMutation({
    mutationKey: [LOOPING_STRATEGY.CREATE_POSITION],
    mutationFn: createPosition,
  });
};

interface ExecuteTransactionPayload {
  to: string;
  data: string;
  value?: string;
}

export const useExecuteStrategyTransaction = () => {
  const { data: walletClient } = useWalletClient();
  const account = useAccount();
  const publicClient = usePublicClient();

  const executeTx = async (payload: ExecuteTransactionPayload) => {
    if (walletClient && publicClient) {
      const payloadData = {
        to: payload.to as `0x${string}`,
        data: payload.data as `0x${string}`,
        value: payload.value ? parseEther(payload.value) : undefined,
        account: account.address as `0x${string}`,
      };

      try {
        const data = await publicClient.call(payloadData);

        const [tokenId, proxyAddress] = decodeAbiParameters(
          parseAbiParameters('uint256 tokenId, address proxyAddress'),
          data.data!,
        );

        const hash = await walletClient.sendTransaction(payloadData);

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        return {
          tokenId,
          proxyAddress,
          receipt,
        };
      } catch (error) {
        console.error('Error executing transaction:', error);
        throw new Error('Error executing transaction', { cause: error });
      }
    } else {
      throw new Error('Ethereum provider not found');
    }
  };
  return useMutation({
    mutationFn: executeTx,
    onSuccess: (data) => {
      console.log('Transaction executed successfully:', data);
    },
    onError: (error) => {
      console.error('Error executing transaction:', error);
    },
  });
};
