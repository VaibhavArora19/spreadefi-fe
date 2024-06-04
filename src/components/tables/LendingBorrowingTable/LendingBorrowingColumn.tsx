import { ColumnDef } from '@tanstack/react-table';
import { TableItem } from '@/types/dataTable';
import Image from 'next/image';
import { tokenNameToImage } from '@/constants/tokenInfo';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { Button } from '@/components/ui/button';
import { NextRouter, Router } from 'next/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const LendingBorrowingColumn = (
  router?: AppRouterInstance,
): ColumnDef<TableItem>[] => [
  {
    accessorKey: 'asset',
    header: 'Asset',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={tokenNameToImage(row.getValue('asset'))}
          height={25}
          width={25}
          alt="weth"
        />
        <p>{row.getValue('asset')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'baseAPY',
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Base APY
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('baseAPY')}</div>
    ),
  },
  {
    accessorKey: 'boostedAPY',
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Boosted APY
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase bg-green-500/10 px-4 py-1 border-[1px] text-xs border-green-900 rounded-full w-fit text-green-500">
        {row.getValue('boostedAPY')}
      </div>
    ),
  },
  {
    accessorKey: 'totalAPY',
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total APY
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase flex gap-2">
        <p>{row.getValue('totalAPY')}</p>

        {row.original.asset === 'ezETH' ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>🐚</TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white capitalize">
                  Points available
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: 'chains',
    header: 'Chains',
    cell: ({ row }) => (
      <div className="flex -space-x-1">
        {row.original.chains.map((chain, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="hover:scale-110"
                  key={index}
                  src={CHAIN_CONFIG[chain].chainImageUrl}
                  height={25}
                  width={25}
                  alt={CHAIN_CONFIG[chain].chainName}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">
                  {CHAIN_CONFIG[chain].chainName}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'protocols',
    header: 'Protocols',
    cell: ({ row }) => (
      <div className="flex -space-x-1">
        {row.original.protocols.map((protocol, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="hover:scale-110"
                  src={protocolNameToImage(protocol)}
                  height={25}
                  width={25}
                  alt={protocol}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">{protocol}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'view',
    header: '',
    cell: ({ row }) => (
      <Button
        onClick={() => {
          router?.push(`/${row.original.asset}`);
        }}
        className="w-full bg-white text-black">
        View
      </Button>
    ),
  },
];

export default LendingBorrowingColumn;
