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
import { useState } from 'react';

import { useFetchAssets } from '@/server/api/asset';
import { useRouter } from 'next/navigation';
import ChainFilterDropdown from '../LendingBorrowingTable/ChainFilterDropdown';
import ProtocolFilterDropdown from '../LendingBorrowingTable/ProtocolFilterDropdown';
import LendingBorrowingHeader from '../LendingBorrowingTable/LendingBorrowingHeader';
import LendingBorrowingTableBody from '../LendingBorrowingTable/LendingBorrowingTableBody';
import TableControls from '../LendingBorrowingTable/TableControls';
import { useFilterDataAssetTable } from '@/hooks/useFilterDataAssetTable';
import { LoopingTableDummyData } from '@/data/DummyData';
import LoopingStrategyColum from './LoopingStrategyColumn';
import LeverageSupplyModal from '@/components/popups/LoopingStrategy/LeverageSupplyModal';

const LoopingStrategyTable = ({ loopingTableData }: any) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showSupplyModal, setShowSupplyModal] = useState(false);

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
  } = useFilterDataAssetTable({ assetData: LoopingTableDummyData });

  const table = useReactTable({
    data: filteredData || [],
    columns: LoopingStrategyColum(setShowSupplyModal),
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

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <TableControls table={table} type="looping" />
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

      {showSupplyModal ? (
        <LeverageSupplyModal
          onClose={() => {
            setShowSupplyModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default LoopingStrategyTable;
