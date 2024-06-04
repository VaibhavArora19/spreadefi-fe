import { ColumnDef } from '@tanstack/react-table';
import { TableItem, TVaultTableItem } from '@/types/dataTable';
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
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const VaultTableColumn = (
  router: AppRouterInstance,
): ColumnDef<TVaultTableItem>[] => [
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
      <div className="lowercase">
        {' '}
        {row.original.baseAPY[0]}% -{' '}
        {row.original.baseAPY[row.original.baseAPY.length - 1]}%
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
      <Button className="w-[50%] bg-white text-black">View</Button>
    ),
  },
];

export default VaultTableColumn;
