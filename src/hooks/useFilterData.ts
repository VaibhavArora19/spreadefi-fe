import { useMemo, useState } from 'react';
// import {  LendingBorrowingDummyData, ValultDummyData } from "@/data/DummyData";
import { TLendingBorrowingTableItem, TVaultTableItem } from '@/types/dataTable';

export type UseFilterDataProps = {
  tab: string;
  lendingTableData: TLendingBorrowingTableItem[],
  vaultTableData: TVaultTableItem[]
}

export type UseFilterDataReturn = {
  chainFilters: string[];
  setChainFilters: React.Dispatch<React.SetStateAction<string[]>>;
  protocolFilters: string[];
  setProtocolFilters: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueChains: string[];
  uniqueProtocols: string[];
  filteredData: any[]; 
}

export const useFilterData = ({ tab, lendingTableData = [], vaultTableData = [] }: UseFilterDataProps): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  const allChains = new Set([
    ...lendingTableData.flatMap(item => item.chains || []),
    ...vaultTableData.flatMap(item => item.chains || []),
  ]);
  const uniqueChains = Array.from(allChains);

  const allProtocols = new Set([
    ...lendingTableData.flatMap(item => item.protocols || []) ,
    ...vaultTableData.flatMap(item => item.protocols || []) ,
  ]);
  const uniqueProtocols = Array.from(allProtocols);

  const filteredData = useMemo(() => {
    const currentData = tab === 'lendBorrow' ? lendingTableData : vaultTableData;
    return currentData.filter(item =>
      (chainFilters.length === 0 || item.chains.some(chain => chainFilters.includes(chain))) &&
      (protocolFilters.length === 0 || item.protocols.some(protocol => protocolFilters.includes(protocol)))
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
