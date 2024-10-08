import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TUserLoopingPosition } from '@/types/looping-strategy';
import { TProtocolName } from '@/types/protocol';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';

interface UserOpenPositionsColumnProps {
  setActiveModal: Dispatch<
    SetStateAction<{
      type: 'modify' | 'close' | null;
      position: TUserLoopingPosition | null;
    }>
  >;
}

const UserOpenPositionsColumn = ({
  setActiveModal,
}: UserOpenPositionsColumnProps): ColumnDef<TUserLoopingPosition>[] => {
  return [
    {
      accessorKey: 'pair',
      header: 'Asset',
      cell: ({ row }) => {
        const [baseAsset, quoteAsset] = row.original.Strategy.pair.split('/');
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
            <p className="ml-2">{row.original.Strategy.pair}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'chain',
      header: 'Chain',
      cell: ({ row }) => {
        const chainInfo = chainList.find(
          (chain) => chain.shortName === row.original.Strategy.chain,
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
        const protocol = row.original.Strategy.market as TProtocolName;
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
        <div>
          {!!row.original.Strategy.positionType ? (
            <div className="lowercase px-4 py-1 border-[1px] text-xs rounded-full w-fit bg-purple-500/10 border-purple-900 text-purple-500">
              <p className="text-xs">Leveraged Staking</p>
            </div>
          ) : (
            <div
              className={`lowercase px-4 py-1 border-[1px] text-xs rounded-full w-fit ${
                row.original.positionType.toLowerCase() === 'long'
                  ? 'bg-green-500/10 border-green-900 text-green-500'
                  : 'bg-red-500/10 border-red-900 text-red-500'
              }`}>
              <p>{row.original.positionType}</p>
            </div>
          )}
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
      accessorKey: 'pnl',
      header: ({ column }) => (
        <div
          className="flex gap-1 items-center w-auto"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          PnL %
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosInformationCircle className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">Profit and loss</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => (
        <div
          className={`lowercase px-4 py-1 border-[1px] text-xs rounded-full w-fit ${
            row.original.pnl >= 0
              ? 'bg-green-500/10 border-green-900 text-green-500'
              : 'bg-red-500/10 border-red-900 text-red-500'
          }`}>
          <p>{row.original.pnl.toFixed(2)}%</p>
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
      cell: ({ row }) => <div>{row.original.liquidationPrice.toFixed(2)}</div>,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="w-fit">
          {row.original.status === 'Closed' ? (
            <div className="px-4 py-1 border-[1px] text-xs rounded-full w-fit bg-cyan-500/10 border-cyan-900 text-cyan-500">
              Position Closed
            </div>
          ) : (
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
          )}
        </div>
      ),
    },
  ];
};

export default UserOpenPositionsColumn;
