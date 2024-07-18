'use client';

import AssetTableColumn from '@/components/tables/AssetTable/AssetColumn';
import LendingBorrowingHeader from '@/components/tables/LendingBorrowingTable/LendingBorrowingHeader';
import LendingBorrowingTableBody from '@/components/tables/LendingBorrowingTable/LendingBorrowingTableBody';
import { Table } from '@/components/ui/table';
import { useFilterDataEthDerivativesTable } from '@/hooks/useFilterDataEthDerivativesTable';
import { Action } from '@/types/strategy';
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

const EthDerivativesTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { filteredData } = useFilterDataEthDerivativesTable();

  const table = useReactTable({
    data: filteredData,
    columns: AssetTableColumn(Action.SUPPLY),
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
    <>
      <div className="rounded-md mt-4">
        <Table>
          <LendingBorrowingHeader table={table} />
          <LendingBorrowingTableBody table={table} />
        </Table>
      </div>
    </>
  );
};

export default EthDerivativesTable;
