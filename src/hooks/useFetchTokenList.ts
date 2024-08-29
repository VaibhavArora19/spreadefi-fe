import { squidConfig } from '@/config/squid';
import { TOKENS } from '@/constants/query';
import { tokensActions } from '@/redux/actions';
import { useTokensStore, useTransactionPayloadStore } from '@/redux/hooks';
import { useAppDispatch } from '@/redux/hooks';
import { Action } from '@/types/strategy';
import { Token } from '@0xsquid/squid-types';
import { useQuery } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

export const useFetchTokenList = (type: Action) => {
  const { tokens } = useTokensStore();
  const { fromChain, toChain } = useTransactionPayloadStore();
  const { address } = useAccount();
  const dispatch = useAppDispatch();

  const fetchTokenList = async (): Promise<
    Array<Token & { balance?: number; balanceUSD?: number }>
  > => {
    if (tokens.length === 0) {
      const squid = await squidConfig();

      const chain = type === Action.WITHDRAW || type === Action.BORROW ? toChain : fromChain;

      let balances: Array<{ address: string; balance: string }> = [];

      const tokens = squid.tokens.filter((token) => token.chainId === chain);

      if (address) {
        const evmBalance = await squid.getEvmBalances({
          userAddress: address,
          chains: [chain],
        });

        balances = evmBalance.map((balance) => {
          return {
            address: balance.address,
            balance: ethers.utils.formatUnits(balance.balance, balance.decimals),
          };
        });

        const tokensWithBalance = tokens
          .map((token) => {
            const matchingItem = balances.find(
              (balance) =>
                ethers.utils.getAddress(balance.address) === ethers.utils.getAddress(token.address),
            );

            return {
              ...token,
              balance: matchingItem ? Number(matchingItem.balance.substring(0, 6)) : 0,
              balanceUSD:
                matchingItem && token.usdPrice
                  ? +(Number(matchingItem.balance.substring(0, 6)) * token.usdPrice).toFixed(3)
                  : 0,
            };
          })
          .sort((a, b) => b.balanceUSD - a.balanceUSD);

        dispatch(tokensActions.setTokens(tokensWithBalance));

        return tokensWithBalance;
      }

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
