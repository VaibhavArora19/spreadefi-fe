import { squidConfig } from '@/config/squid';
import { TOKENS } from '@/constants/query';
import { tokensActions } from '@/redux/actions';
import { useTokensStore, useTransactionPayloadStore } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { Action } from '@/types/strategy';
import { useQuery } from '@tanstack/react-query';

export const useFetchTokenList = (type: Action) => {
  const { tokens } = useTokensStore();
  const { fromChain, toChain } = useTransactionPayloadStore();
  const dispatch = useAppDispatch();

  const fetchTokenList = async () => {
    if (tokens.length === 0) {
      const squid = await squidConfig();

      const chain = type === Action.WITHDRAW || type === Action.BORROW ? toChain : fromChain;

      const tokens = squid.tokens.filter((token) => token.chainId === chain);
      dispatch(tokensActions.setTokens(tokens));

      return tokens;
    }

    return tokens;
  };

  return useQuery({
    queryKey: [TOKENS.FETCH_LIST, fromChain],
    queryFn: fetchTokenList,
    refetchOnWindowFocus: false,
  });
};

export const useFetchTokenListForChain = () => {
  const fetchList = async (chainId: string) => {
    const squid = await squidConfig();

    const tokens = squid.tokens.filter((token) => token.chainId === chainId);

    return tokens;
  };

  return { fetchList };
};
