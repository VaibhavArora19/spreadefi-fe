'use client';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TUserLoopingPosition } from '@/types/looping-strategy';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ClosePositionModal from './ClosePositionModal';
import ModifyPositionModal from './ModifyPositionModal';
import UserOpenPositionsColumn from './UserOpenPositionsColumn';

interface LoopingPositionTableProps {
  data: TUserLoopingPosition[];
}

const LoopingPositionTable: React.FC<LoopingPositionTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeModal, setActiveModal] = useState<{
    type: 'modify' | 'close' | null;
    position: TUserLoopingPosition | null;
  }>({ type: null, position: null });

  const columns = UserOpenPositionsColumn({ setActiveModal });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (!data.length) {
    return (
      <div className="flex flex-col items-start justify-center w-full md:w-[95%] mx-auto">
        <h1 className="font-semibold text-gray-200">No positions found</h1>
        <p className="text-sm text-gray-300">You {`don't`} have any positions yet.</p>
      </div>
    );
  }

  return (
    <>
      <Table className="w-full md:w-[95%] mx-auto">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b border-[#1e1e1e]">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="font-light text-[#939393]">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-none">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-none cursor-pointer hover:bg-[#131313]">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-4 w-fit font-light">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!!data.length && (
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

      {activeModal.type === 'modify' && activeModal.position && (
        <ModifyPositionModal
          position={activeModal.position}
          onSubmit={() => {
            setActiveModal({ type: null, position: null });
          }}
          onClose={() => setActiveModal({ type: null, position: null })}
        />
      )}

      {activeModal.type === 'close' && activeModal.position && (
        <ClosePositionModal
          position={activeModal.position}
          onClose={() => setActiveModal({ type: null, position: null })}
          onSubmit={() => {
            setActiveModal({ type: null, position: null });
          }}
        />
      )}
    </>
  );
};

export default LoopingPositionTable;
