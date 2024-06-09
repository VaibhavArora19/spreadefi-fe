'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '@/components/ui/table';
import LendingBorrowingColumn from './LendingBorrowingColumn';
import LendingBorrowingHeader from './LendingBorrowingHeader';
import LendingBorrowingTableBody from './LendingBorrowingTableBody';
import VaultTableColumn from '../VaultTable/VaultTableColumn';
import { useState } from 'react';

import TableControls from './TableControls';
import ChainFilterDropdown from './ChainFilterDropdown';
import ProtocolFilterDropdown from './ProtocolFilterDropdown';
import { useFilterData } from '@/hooks/useFilterData';
import { useFetchAssets } from '@/server/api/asset';
import { useRouter } from 'next/navigation';

const LendingBorrowingTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tab, setTab] = useState<string>('lendBorrow');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { data, isLoading, isError, error } = useFetchAssets();

  const router = useRouter();

  const {
    chainFilters,
    setChainFilters,
    protocolFilters,
    setProtocolFilters,
    uniqueChains,
    uniqueProtocols,
    filteredData,
  } = useFilterData({
    tab,
    lendingTableData: data?.lendingTableData || [],
    vaultTableData: data?.vaultTableData || [],
  });

  const columns =
    tab === 'lendBorrow'
      ? LendingBorrowingColumn(router)
      : VaultTableColumn(router);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <TableControls tab={tab} setTab={setTab} table={table} />
        <div className="flex gap-4 items-center">
          <ChainFilterDropdown
            chainFilters={chainFilters}
            setChainFilters={setChainFilters}
            uniqueChains={uniqueChains}
          />
          <ProtocolFilterDropdown
            protocolFilters={protocolFilters}
            setProtocolFilters={setProtocolFilters}
            uniqueProtocols={uniqueProtocols}
          />
        </div>
      </div>
      <div className="rounded-md mt-4">
        <Table>
          <LendingBorrowingHeader table={table} />
          <LendingBorrowingTableBody table={table} />
        </Table>
      </div>
    </div>
  );
};

export default LendingBorrowingTable;
