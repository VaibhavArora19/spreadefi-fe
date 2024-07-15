import { squidConfig } from '@/config/squid';
import { TOKENS } from '@/constants/query';
import { tokensActions } from '@/redux/actions';
import { useTokensStore, useTransactionPayloadStore } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { useQuery } from '@tanstack/react-query';

export const useFetchTokenList = () => {
  const { tokens } = useTokensStore();
  const { fromChain } = useTransactionPayloadStore();
  const dispatch = useAppDispatch();

  const fetchTokenList = async () => {
    if (tokens.length === 0) {
      const squid = await squidConfig();

      const tokens = squid.tokens.filter((token) => token.chainId === fromChain);
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
