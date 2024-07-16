import { ColumnDef, Row } from '@tanstack/react-table';
import { TableItem, TAssetTableItem, TLoopinStrategyTableItem } from '@/types/dataTable';
import { IoIosInformationCircle } from 'react-icons/io';
import Image from 'next/image';
import { assetNameToImage } from '@/constants/assetInfo';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { Button } from '@/components/ui/button';
import MultiplierSlider from './MultiplierSlider';
import { useDispatch } from 'react-redux';
import { transactionPayloadActions } from '@/redux/actions';
import { useState } from 'react';

const LoopingStrategyColum = (
  setShowSupplyModal: React.Dispatch<React.SetStateAction<boolean>>,
): ColumnDef<TLoopinStrategyTableItem>[] => {
  const dispatch = useDispatch();

  const [multipliers, setMultipliers] = useState<{ [key: string]: number }>({});

  const handleMultiplierChange = (id: string, value: number) => {
    setMultipliers((prev) => ({ ...prev, [id]: value }));
  };

  const showSupplyModalHandler = (row: Row<TLoopinStrategyTableItem>) => {
    dispatch(transactionPayloadActions.setStrategyName(row.original.protocolName + '-Looping'));
    dispatch(transactionPayloadActions.setToChain(row.original.chainId));
    dispatch(transactionPayloadActions.setToToken(row.original.assetAddress));
    dispatch(transactionPayloadActions.setLeverage(multipliers[row.id]));
    setShowSupplyModal ? setShowSupplyModal(true) : null;
  };

  return [
    {
      accessorKey: 'assetSymbol',
      header: 'Asset',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Image
            src={assetNameToImage(row.getValue('assetSymbol'))}
            height={20}
            width={20}
            alt="weth"
            className="rounded-full"
          />
          <Image
            src={assetNameToImage('weth')}
            height={20}
            width={20}
            alt="weth"
            className="rounded-full"
          />

          <p className="ml-2">
            {row.getValue('assetSymbol')} / {'WETH'}{' '}
          </p>
        </div>
      ),
    },
    {
      accessorKey: 'chainIds',
      header: 'Chains',
      cell: ({ row }) => (
        <div className="flex -space-x-1 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="hover:scale-110"
                  src={CHAIN_CONFIG[row.original.chainId].chainImageUrl}
                  height={25}
                  width={25}
                  alt={CHAIN_CONFIG[row.original.chainId].chainName}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">
                  {CHAIN_CONFIG[row.original.chainId].chainName}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: 'protocolName',
      header: 'Protocols',
      cell: ({ row }) => (
        <div className="flex -space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="hover:scale-110"
                  src={protocolNameToImage(row.original.protocolName)}
                  height={25}
                  width={25}
                  alt={row.original.protocolName}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">{row.original.protocolName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                    Points rewarded for supplying tokens in this particular asset pool
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },

      cell: ({ row }) => (
        <div className="flex gap-3 flex-wrap overflow-hidden text-ellipsis w-full">
          {row.original.points.length > 0 ? (
            row.original.points.map((point, index) => (
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
            ))
          ) : (
            <div className="text-center align-center">-</div>
          )}
        </div>
      ),
    },

    {
      accessorKey: 'multiplier',
      header: 'Multiplier',
      cell: ({ row }) => (
        <MultiplierSlider
          value={multipliers[row.id] || 30}
          onChange={(value) => handleMultiplierChange(row.id, value)}
        />
      ),
    },
    {
      accessorKey: 'APY',
      header: ({ column }) => {
        return (
          <div
            className="flex gap-1 items-center w-[100px]"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            APY
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IoIosInformationCircle className="cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-[#1e1e1e] text-white">
                    APY of selected multiplier for that protocol
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase flex gap-2 items-center w-[100px]">
          <p>{row.original.apy} </p>
        </div>
      ),
    },

    {
      accessorKey: 'view',
      header: '',
      cell: ({ row }) => (
        <Button
          onClick={() => {
            showSupplyModalHandler(row);
          }}
          className="w-[80%] bg-white text-black">
          Supply
        </Button>
      ),
    },
  ];
};

export default LoopingStrategyColum;
