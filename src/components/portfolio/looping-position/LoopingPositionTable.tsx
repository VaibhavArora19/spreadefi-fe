'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TUserLoopingPosition } from '@/types/looping-strategy';
import { TProtocolName } from '@/types/protocol';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward, IoIosInformationCircle } from 'react-icons/io';
import ClosePositionModal from './ClosePositionModal';
import ModifyLeverageModal from './ModifyPositionModal';

interface LoopingPositionTableProps {
  data: TUserLoopingPosition[];
}

const LoopingPositionTable: React.FC<LoopingPositionTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeModal, setActiveModal] = useState<{
    type: 'modify' | 'close' | null;
    position: TUserLoopingPosition | null;
  }>({ type: null, position: null });

  const columns: ColumnDef<TUserLoopingPosition>[] = [
    {
      accessorKey: 'pair',
      header: 'Asset',
      cell: ({ row }) => {
        const [baseAsset, quoteAsset] = row.original.strategyId.split('-');
        return (
          <div className="flex items-center gap-1">
            <Image
              src={assetNameToImage(baseAsset)}
              height={20}
              width={20}
              alt={baseAsset}
              className="rounded-full"
            />
            <Image
              src={assetNameToImage(quoteAsset)}
              height={20}
              width={20}
              alt={quoteAsset}
              className="rounded-full"
            />
            <p className="ml-2">{`${baseAsset}/${quoteAsset}`}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'chain',
      header: 'Chain',
      cell: ({ row }) => {
        const chainInfo = chainList.find(
          (chain) => chain.shortName === row.original.strategyId.split('-')[2],
        );
        return (
          <div className="flex -space-x-1 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {!!chainInfo?.logo ? (
                    <Image
                      className="hover:scale-110"
                      src={chainInfo?.logo}
                      height={28}
                      width={28}
                      alt={chainInfo?.shortName}
                    />
                  ) : (
                    <div className="flex items-center justify-center size-7 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-[#1e1e1e] text-white">{chainInfo?.chainName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      accessorKey: 'protocol',
      header: 'Protocol',
      cell: ({ row }) => {
        const protocol = row.original.strategyId.split('-')[3] as TProtocolName;
        const protocolImage = protocolNameToImage(protocol);
        return (
          <div className="flex -space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {protocolImage ? (
                    <Image
                      className="hover:scale-110"
                      src={protocolImage}
                      height={28}
                      width={28}
                      alt={protocol}
                    />
                  ) : (
                    <div className="w-[25px] h-[25px] bg-gray-300 rounded-full flex items-center justify-center">
                      {protocol.charAt(0)}
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-[#1e1e1e] text-white">{protocol}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      accessorKey: 'positionType',
      header: ({ column }) => (
        <div
          className="w-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Position Type
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={`lowercase px-4 py-1 border-[1px] text-xs rounded-full w-fit ${
            row.original.positionType.toLowerCase() === 'long'
              ? 'bg-green-500/10 border-green-900 text-green-500'
              : 'bg-red-500/10 border-red-900 text-red-500'
          }`}>
          <p>{row.original.positionType}</p>
        </div>
      ),
    },
    {
      accessorKey: 'leverage',
      header: () => (
        <div className="flex gap-1 items-center">
          Leverage
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosInformationCircle className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">Current leverage of the position</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
      cell: ({ row }) => <div>{row.original.leverage.toFixed(2)}x</div>,
    },

    {
      accessorKey: 'roe',
      header: ({ column }) => (
        <div
          className="flex gap-1 items-center w-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          ROE
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosInformationCircle className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">Return on Equity</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={`lowercase px-4 py-1 border-[1px] text-xs rounded-full w-fit ${
            row.original.roe >= 0
              ? 'bg-green-500/10 border-green-900 text-green-500'
              : 'bg-red-500/10 border-red-900 text-red-500'
          }`}>
          <p>{row.original.roe.toFixed(2)}%</p>
        </div>
      ),
    },
    {
      accessorKey: 'liquidationPrice',
      header: () => (
        <div className="flex gap-1 items-center">
          Liq. Price
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosInformationCircle className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">
                  Price at which the position will be liquidated
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
      cell: ({ row }) => <div>${row.original.liquidationPrice.toFixed(2)}</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto border-none bg-[#27272A]">
                Edit <FaEdit className="ml-2 h-4 w-4 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setActiveModal({ type: 'modify', position: row.original })}>
                Modify
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setActiveModal({ type: 'close', position: row.original })}>
                Close position
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

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
        <ModifyLeverageModal
          position={activeModal.position}
          onSubmit={() => {
            console.log('Modify Leverage', activeModal.position);
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
            console.log('Close Position', activeModal.position);
            setActiveModal({ type: null, position: null });
          }}
        />
      )}
    </>
  );
};

export default LoopingPositionTable;
