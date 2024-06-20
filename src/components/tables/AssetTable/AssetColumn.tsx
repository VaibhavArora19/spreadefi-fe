import { ColumnDef } from '@tanstack/react-table';
import { TableItem, TAssetTableItem } from '@/types/dataTable';
import { IoIosInformationCircle } from 'react-icons/io';
import Image from 'next/image';
import { assetNameToImage } from '@/constants/assetInfo';
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

const AssetTableColumn: ColumnDef<TAssetTableItem>[] = [
  {
    accessorKey: 'assetSymbol',
    header: 'Asset',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={assetNameToImage(row.getValue('assetSymbol'))}
          height={25}
          width={25}
          alt="weth"
        />
        <p>{row.getValue('assetSymbol')}</p>
      </div>
    ),
  },
  {
    accessorKey: 'totalApys',
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          APY
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosInformationCircle className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">
                  Base APY + Boosted APY of the asset to be supplied
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase flex gap-2 items-center">
        <p>{row.getValue('totalApys')} </p>

        {row.original.assetSupplyBoostedApys ? (
          <p className="lowercase text-sm w-fit text-yellow-500">
            + {row.original.assetSupplyBoostedApys}
          </p>
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: 'points',
    header: () => {
      return (
        <div className="flex gap-1 items-center">
          Points
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoIosInformationCircle className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">
                  Points rewarded for supplying tokens in this particular asset
                  pool
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },

    cell: ({ row }) => (
      <div className="flex gap-3 flex-wrap overflow-hidden text-ellipsis w-full">
        {row.original.points.map((point, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div className="px-4 py-1 bg-green-700/20 text-green-400 rounded-md text-xs ">
                  {point}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">{point}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'chainIds',
    header: 'Chains',
    cell: ({ row }) => (
      <div className="flex -space-x-1 ">
        {row.original.chainIds.map((chain, index) => (
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
      <Button className="w-[80%] bg-white text-black">Supply</Button>
    ),
  },
];

export default AssetTableColumn;
