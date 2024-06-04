'use client';

import AssetTableColumn from '@/components/tables/AssetTable/AssetColumn';
import ChainFilterDropdown from '@/components/tables/LendingBorrowingTable/ChainFilterDropdown';
import LendingBorrowingColumn from '@/components/tables/LendingBorrowingTable/LendingBorrowingColumn';
import LendingBorrowingHeader from '@/components/tables/LendingBorrowingTable/LendingBorrowingHeader';
import LendingBorrowingTableBody from '@/components/tables/LendingBorrowingTable/LendingBorrowingTableBody';
import ProtocolFilterDropdown from '@/components/tables/LendingBorrowingTable/ProtocolFilterDropdown';
import TableControls from '@/components/tables/LendingBorrowingTable/TableControls';
import VaultTableColumn from '@/components/tables/VaultTable/VaultTableColumn';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { useFilterData, useFilterDataAssetTable } from '@/hooks/useFilterData';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import React, { useState } from 'react';

const AssetPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const {
    chainFilters,
    setChainFilters,
    protocolFilters,
    setProtocolFilters,
    uniqueChains,
    uniqueProtocols,
    filteredData,
  } = useFilterDataAssetTable();

  const table = useReactTable({
    data: filteredData,
    columns: AssetTableColumn,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search token by name"
          value={(table.getColumn('asset')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('asset')?.setFilterValue(event.target.value)
          }
          className="max-w-md py-4 bg-[#27272A] border-none text-white placeholder:text-[#84848A]"
        />
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

export default AssetPage;
