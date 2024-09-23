'use client';

import React, { useState, useEffect } from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table } from '@/components/ui/table';
import ChainFilterDropdown from '../LendingBorrowingTable/ChainFilterDropdown';
import ProtocolFilterDropdown from '../LendingBorrowingTable/ProtocolFilterDropdown';
import LendingBorrowingHeader from '../LendingBorrowingTable/LendingBorrowingHeader';
import LendingBorrowingTableBody from '../LendingBorrowingTable/LendingBorrowingTableBody';
import TableControls from '../LendingBorrowingTable/TableControls';
import { useFilterDataAssetTable } from '@/hooks/useFilterDataAssetTable';
import LeverageSupplyModal from '@/components/popups/LoopingStrategy/LeverageSupplyModal';
import { useAccount } from 'wagmi';
import { useExecuteTransactions } from '@/server/api/transactions';
import { useDispatch } from 'react-redux';
import { tokensActions, transactionPayloadActions, transactionsActions } from '@/redux/actions';
import { walletActions } from '@/redux/features/wallet-slice';
import ConnectWallet from '@/components/popups/Wallet/ConnectWallet';
import { useWalletStore } from '@/redux/hooks';
import LoopingStrategyColumn from './LoopingStrategyColumn';
import { Button } from '@/components/ui/button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface LoopingStrategyTableProps {
  loopingTableData: any[];
}

const LoopingStrategyTable: React.FC<LoopingStrategyTableProps> = ({ loopingTableData }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { address } = useAccount();
  const { execute } = useExecuteTransactions();

  const dispatch = useDispatch();
  const { isConnected } = useWalletStore();

  const {
    chainFilters,
    setChainFilters,
    protocolFilters,
    setProtocolFilters,
    uniqueChains,
    uniqueProtocols,
    filteredData,
  } = useFilterDataAssetTable({ assetData: loopingTableData });

  const columns = LoopingStrategyColumn(setShowSupplyModal, filteredData);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const handleLeverageSubmit = async () => {
    if (!address) {
      dispatch(walletActions.setIsConnected(false));
      return;
    }

    const data = await execute();
  };

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
      {!!loopingTableData.length && (
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="default"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <IoIosArrowBack className="size-5" />
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <Button
              variant="default"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <IoIosArrowForward className="size-5" />
            </Button>
          </div>
        </div>
      )}
      {showSupplyModal && (
        <LeverageSupplyModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            dispatch(transactionsActions.resetState());
            dispatch(tokensActions.resetState());
            setShowSupplyModal(false);
          }}
          onSubmit={handleLeverageSubmit}
        />
      )}
      {!isConnected && <ConnectWallet />}
    </div>
  );
};

export default LoopingStrategyTable;
