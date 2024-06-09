import { useMemo, useState } from 'react';
// import {  LendingBorrowingDummyData, ValultDummyData } from "@/data/DummyData";
import { TLendingBorrowingTableItem, TVaultTableItem } from '@/types/dataTable';
import { TAssetsResponse } from '@/types/asset';

export type UseFilterDataProps = {
  tab: string;
  lendingTableData: TAssetsResponse[];
  vaultTableData: TAssetsResponse[];
};

export type UseFilterDataReturn = {
  chainFilters: string[];
  setChainFilters: React.Dispatch<React.SetStateAction<string[]>>;
  protocolFilters: string[];
  setProtocolFilters: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueChains: string[];
  uniqueProtocols: string[];
  filteredData: any[];
};

export const useFilterData = ({
  tab,
  lendingTableData = [],
  vaultTableData = [],
}: UseFilterDataProps): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  const allChains = new Set([
    ...lendingTableData.flatMap((item) => item.chainIds || []),
    ...vaultTableData.flatMap((item) => item.chainIds || []),
  ]);
  const uniqueChains = Array.from(allChains);

  const allProtocols = new Set([
    ...lendingTableData.flatMap((item) => item.protocolNames || []),
    ...vaultTableData.flatMap((item) => item.protocolNames || []),
  ]);
  const uniqueProtocols = Array.from(allProtocols);

  const filteredData = useMemo(() => {
    const currentData =
      tab === 'lendBorrow' ? lendingTableData : vaultTableData;
    return currentData.filter(
      (item) =>
        (chainFilters.length === 0 ||
          item.chainIds.some((chain) => chainFilters.includes(chain))) &&
        (protocolFilters.length === 0 ||
          item.protocolNames.some((protocol) =>
            protocolFilters.includes(protocol),
          )),
    );
  }, [chainFilters, protocolFilters, tab, lendingTableData, vaultTableData]);

  return {
    chainFilters,
    setChainFilters,
    protocolFilters,
    setProtocolFilters,
    uniqueChains,
    uniqueProtocols,
    filteredData,
  };
};
