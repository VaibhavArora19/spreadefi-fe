'use client';

import BorrowSupplyModal from '@/components/popups/Borrow&Action/BorrowSupplyModal';
import MigrateSupplyModal from '@/components/popups/MigrateModal/MigrateSupplyModal';
import SupplyModal from '@/components/popups/common/SupplyModal';
import AssetTableColumn from '@/components/tables/AssetTable/AssetColumn';
import ChainFilterDropdown from '@/components/tables/LendingBorrowingTable/ChainFilterDropdown';
import LendingBorrowingHeader from '@/components/tables/LendingBorrowingTable/LendingBorrowingHeader';
import LendingBorrowingTableBody from '@/components/tables/LendingBorrowingTable/LendingBorrowingTableBody';
import ProtocolFilterDropdown from '@/components/tables/LendingBorrowingTable/ProtocolFilterDropdown';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { useFilterDataAssetTable } from '@/hooks/useFilterDataAssetTable';
import { useExecuteTransactions } from '@/server/api/transactions';
import { TAssetTableItem } from '@/types/dataTable';
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
import { useAccount } from 'wagmi';
import { useTransactionPayloadStore } from '@/redux/hooks';

const AssetTable = ({
  assetData,
  type,
}: {
  assetData: TAssetTableItem[];
  type: 'supply' | 'migrate' | 'borrowAndAction';
}) => {
  const { address } = useAccount();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [showMigrateSupplyModal, setShowMigrateSupplyModal] = useState(false);
  const [showBorrowSupplyModal, setShowBorrowSupplyModal] = useState(false);
  const [showSupplyModal, setShowSupplyModal] = useState(false);

  const {
    chainFilters,
    setChainFilters,
    protocolFilters,
    setProtocolFilters,
    uniqueChains,
    uniqueProtocols,
    filteredData,
  } = useFilterDataAssetTable({ assetData: assetData || [] });
  const { fromAmount, fromChain, fromToken, toChain, toToken, fromTokenDecimals } =
    useTransactionPayloadStore();

  const { execute } = useExecuteTransactions();

  const table = useReactTable({
    data: filteredData,
    columns: AssetTableColumn(
      type,
      setShowMigrateSupplyModal,
      setShowBorrowSupplyModal,
      setShowSupplyModal,
    ),
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

  const handleSupplySubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) return;

    const data = await execute();
  };

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search token by name"
          value={(table.getColumn('assetSymbol')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('assetSymbol')?.setFilterValue(event.target.value)}
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

      {showMigrateSupplyModal ? (
        <MigrateSupplyModal
          onClose={() => {
            setShowMigrateSupplyModal(false);
          }}
        />
      ) : null}

      {showSupplyModal ? (
        <SupplyModal
          onClose={() => {
            setShowSupplyModal(false);
          }}
          onSubmit={handleSupplySubmit}
        />
      ) : null}

      {showBorrowSupplyModal ? (
        <BorrowSupplyModal
          onClose={() => {
            setShowBorrowSupplyModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default AssetTable;
