import { axiosLoopingPositions } from '@/config';
import { LOOPING_STRATEGY } from '@/constants/query';
import {
  PositionType,
  TCreatePositionPayload,
  TLoopingStrategy,
  TLoopingStrategyQuotePayload,
  TModifyPositionPayload,
  TModifyPositionResponse,
  TUpdatePositionEntryPayload,
  TUserLoopingPosition,
  TUserLoopingPositionResponse,
} from '@/types/looping-strategy';
import { useMutation, useQuery } from '@tanstack/react-query';
import { decodeAbiParameters, parseAbiParameters, parseEther } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

interface ExecuteTransactionPayload {
  to: string;
  data: string;
  value?: string;
}

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

export const useFetchLoopingStrategyById = (
  strategyId: string,
  positionType: PositionType,
  enabled?: boolean,
) => {
  const fetchPositionById = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TLoopingStrategy>(
        `/strategy/${strategyId}?position=${positionType}`,
      );

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

export const useFetchUserCreatedPositions = (address: string) => {
  const fetchUserPositions = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TUserLoopingPosition[]>(
        `/positions?address=${address}`,
      );

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH_USER_POSITIONS],
    queryFn: fetchUserPositions,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useFetchUserCreatedPositionById = (positionId: string) => {
  const fetchUserPositionDetails = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TUserLoopingPositionResponse>(
        `/positions/${positionId}`,
      );

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH_USER_POSITION_BY_ID],
    queryFn: fetchUserPositionDetails,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useCreateLoopingPosition = () => {
  const createPosition = async (payload: TCreatePositionPayload) => {
    try {
      const { data } = await axiosLoopingPositions.put('/positions', payload);

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

export const useModifyLoopingPosition = (positionId: string) => {
  const modifyPosition = async (payload: TModifyPositionPayload) => {
    try {
      const { data } = await axiosLoopingPositions.post<TModifyPositionResponse>(
        `/positions/${positionId}/modify`,
        payload,
      );

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useMutation({
    mutationKey: [LOOPING_STRATEGY.MODIFY_POSITION],
    mutationFn: modifyPosition,
  });
};

export const useUpdateLoopingPositionEntry = (positionId: string) => {
  const updatePositionInDb = async (payload: TUpdatePositionEntryPayload) => {
    try {
      const { data } = await axiosLoopingPositions.post(`/positions/${positionId}`, payload);

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useMutation({
    mutationKey: [LOOPING_STRATEGY.UPDATE_POSITION_BY_ID],
    mutationFn: updatePositionInDb,
  });
};

// create position
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

// add remove close approvals
export const useExecuteTransaction = () => {
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
        const hash = await walletClient.sendTransaction(payloadData);

        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        return {
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
