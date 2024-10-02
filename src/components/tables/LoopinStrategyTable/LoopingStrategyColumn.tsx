import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IoIosInformationCircle } from 'react-icons/io';
import Image from 'next/image';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button, buttonVariants } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { transactionPayloadActions } from '@/redux/actions';
import { assetNameToImage } from '@/constants/assetInfo';
import { CHAIN_CONFIG, chainList } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TProtocolName } from '@/types/protocol';
import { TLoopingStrategy } from '@/types/looping-positions';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const LoopingStrategyColumn = (
  setShowSupplyModal: React.Dispatch<React.SetStateAction<boolean>>,
  data: TLoopingStrategy[],
): ColumnDef<TLoopingStrategy>[] => {
  const dispatch = useDispatch();

  return [
    {
      accessorKey: 'pair',
      header: 'Asset',
      cell: ({ row }) => {
        const [baseAsset, quoteAsset] = row.original.pair.split('/');
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
            <p className="ml-2">{row.original.pair}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'chain',
      header: 'Chain',
      cell: ({ row }) => {
        const chainInfo = chainList.find((chain) => chain.shortName === row.original.chain);
        return (
          <div className="flex -space-x-1 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    className="hover:scale-110"
                    src={chainInfo?.logo || ''}
                    height={25}
                    width={25}
                    alt={row.original.chain}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-[#1e1e1e] text-white">{row.original.chain}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      accessorKey: 'market',
      header: 'Protocol',
      cell: ({ row }) => {
        const protocolImage = protocolNameToImage(row.original.market as TProtocolName);
        return (
          <div className="flex -space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {protocolImage ? (
                    <Image
                      className="hover:scale-110"
                      src={protocolImage}
                      height={25}
                      width={25}
                      alt={row.original.market}
                    />
                  ) : (
                    <div className="w-[25px] h-[25px] bg-gray-300 rounded-full flex items-center justify-center">
                      {row.original.market.charAt(0)}
                    </div>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-[#1e1e1e] text-white">{row.original.market}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Link
          href={`/looping/${row.original.id}`}
          className={cn(buttonVariants({ variant: 'default' }), 'w-32 bg-white text-black')}>
          Create Position
        </Link>
      ),
    },
  ];
};

export default LoopingStrategyColumn;
