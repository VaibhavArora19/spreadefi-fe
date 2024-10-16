'use client';

import ConnectWallet from '@/components/popups/Wallet/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { useFilterDataAssetTable } from '@/hooks/useFilterDataAssetTable';
import { walletActions } from '@/redux/features/wallet-slice';
import { useWalletStore } from '@/redux/hooks';
import { useExecuteTransactions } from '@/server/api/transactions';
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
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import LendingBorrowingHeader from '../LendingBorrowingTable/LendingBorrowingHeader';
import LendingBorrowingTableBody from '../LendingBorrowingTable/LendingBorrowingTableBody';
import PerpetualPositionsColumn from './PerpetualPositionsColumn';

interface PerpetualPositionsTableProps {
  perpetualPositionsData: any[];
}

const PerpetualPositionsTable: React.FC<PerpetualPositionsTableProps> = ({
  perpetualPositionsData,
}) => {
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

  const { filteredData } = useFilterDataAssetTable({ assetData: perpetualPositionsData });

  const columns = PerpetualPositionsColumn(filteredData);

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
      <div className="rounded-md mt-4">
        <Table>
          <LendingBorrowingHeader table={table} />
          <LendingBorrowingTableBody table={table} />
        </Table>
      </div>
      {!!perpetualPositionsData.length && (
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

      {!isConnected && <ConnectWallet />}
    </div>
  );
};

export default PerpetualPositionsTable;
