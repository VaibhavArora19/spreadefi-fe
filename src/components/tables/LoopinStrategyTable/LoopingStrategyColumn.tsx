import { buttonVariants } from '@/components/ui/button';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { cn } from '@/lib/utils';
import { TLoopingStrategy } from '@/types/looping-strategy';
import { TProtocolName } from '@/types/protocol';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

const LoopingStrategyColumn = (
  setShowSupplyModal: React.Dispatch<React.SetStateAction<boolean>>,
  data: TLoopingStrategy[],
): ColumnDef<TLoopingStrategy>[] => {
  const dispatch = useDispatch();
  const router = useRouter();

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
          <div className="flex items-center gap-1">
            <Image
              className="hover:scale-110"
              src={chainInfo?.logo || ''}
              height={25}
              width={25}
              alt={row.original.chain}
            />
            <div>{chainInfo?.shortName}</div>
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
          <div className="flex items-center gap-1">
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

            <div>{row.original.market}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'swapMarket',
      header: 'Swap Market',
      cell: ({ row }) => {
        const image = protocolNameToImage(row.original.swapMarket as TProtocolName);
        return (
          <div className="flex items-center gap-1">
            {image && (
              <Image
                className="hover:scale-110"
                src={image}
                height={25}
                width={25}
                alt={row.original.swapMarket}
              />
            )}
            <div>{row.original.swapMarket}</div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div
          onClick={() => router.push(`/looping/${row.original.id}`)}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-32 ml-auto bg-white text-black',
          )}>
          Create Position
        </div>
      ),
    },
    // {
    //   id: 'actions',
    //   cell: ({ row }) => (
    //     <div
    //       // href={`/looping/${row.original.id}`}
    //       onClick={() => router.push(`/looping/${row.original.id}`)}
    //       className={cn(
    //         buttonVariants({ variant: 'default' }),
    //         'w-32 ml-auto bg-white text-black',
    //       )}>
    //       Create Position
    //     </div>
    //   ),
    // },
  ];
};

export default LoopingStrategyColumn;
