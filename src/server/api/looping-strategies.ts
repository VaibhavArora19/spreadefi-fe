import { axiosLoopingPositions } from '@/config';
import { wethABI } from '@/constants/abi/wethABI';
import { LOOPING_STRATEGY } from '@/constants/query';
import {
  PositionType,
  TCreatePositionPayload,
  TLoopingStrategy,
  TLoopingStrategyQuotePayload,
  TModifyPositionPayload,
  TModifyPositionResponse,
  TQuoteData,
  TUpdatePositionEntryPayload,
  TUserLoopingPosition,
  TUserLoopingPositionResponse,
} from '@/types/looping-strategy';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { decodeAbiParameters, parseAbiParameters, parseEther } from 'viem';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

interface ExecuteTransactionPayload {
  to: string;
  data: string;
  value?: string;
  isWethTransaction?: boolean;
  marginAmount?: number;
}

export const useFetchLoopingStrategies = (leveragd?: boolean) => {
  const params = leveragd ? `?leveraged=true` : '';

  const fetchPositions = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TLoopingStrategy[]>(`/strategy${params}`);

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH, leveragd],
    queryFn: fetchPositions,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useFetchLoopingStrategyById = ({
  strategyId,
  positionType,
  leverage,
  enabled = true,
}: {
  strategyId: string;
  positionType?: PositionType;
  leverage?: number;
  enabled?: boolean;
}) => {
  const params = new URLSearchParams();

  if (positionType) {
    params.append('position', positionType);
  }

  if (leverage) {
    params.append('leverage', leverage.toString());
  }

  const fetchStrategy = async () => {
    try {
      const url = `/strategy/${strategyId}${params.toString() ? `?${params.toString()}` : ''}`;
      const { data } = await axiosLoopingPositions.get<TLoopingStrategy>(url);
      return data;
    } catch (error: any) {
      console.error('error: ', error);
      throw error;
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH_BY_ID, strategyId, positionType, leverage],
    queryFn: fetchStrategy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled,
  });
};

export const useGetLoopingStrategyQuote = (strategyId: string | undefined) => {
  const fetchQuote = async (payload: TLoopingStrategyQuotePayload) => {
    if (!strategyId) {
      throw new Error('Strategy ID is required');
    }
    try {
      const { data } = await axiosLoopingPositions.post<TQuoteData>(
        `/strategy/${strategyId}/quote`,
        payload,
      );
      return data;
    } catch (error: any) {
      console.error('error: ', error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: [LOOPING_STRATEGY.FETCH_QUOTE_BY_ID, strategyId],
    mutationFn: fetchQuote,
    onError: (error: any) => {
      console.error('Error fetching quote:', error);
    },
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
      toast.success('Transaction executed successfully');
      console.log('Transaction executed successfully:', data);
    },
    onError: (error) => {
      toast.error('Error executing transaction');
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
        if (
          payload.isWethTransaction &&
          payload.to === '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f'
        ) {
          toast.loading('Converting ETH to WETH');
          // this is a WETH transaction, and needs to convert ETH to WETH first
          const wethContract = {
            address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f' as `0x${string}`,
            abi: wethABI,
          };

          const request = await publicClient.simulateContract({
            ...wethContract,
            functionName: 'deposit',
            value: parseEther(payload.marginAmount?.toString() || '0'),
          });

          if (request) {
            toast.dismiss();
            const ethToWethHash = await walletClient.writeContract(request.request);
            await publicClient.waitForTransactionReceipt({ hash: ethToWethHash });
            toast.success('ETH to WETH conversion successful');
          }
          toast.dismiss();
        }

        // execute main transaction
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
      toast.success('Transaction executed successfully');
      console.log('Transaction executed successfully:', data);
    },
    onError: (error) => {
      toast.error('Error executing transaction');
      console.error('Error executing transaction:', error);
    },
  });
};
