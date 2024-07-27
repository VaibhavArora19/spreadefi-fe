import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { useTransactionPayloadStore } from '@/redux/hooks';
import { TProtocolName } from '@/types/protocol';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Action } from '@/types/strategy';
import { IoIosArrowDown } from 'react-icons/io';
import TransactionDetailsModal from './TransactionDetailsModal';
import Loader from '@/components/(ui)/Loader';

const MigrateTransactionOverview = ({
  type,
}: {
  type:
    | Action.BORROW_SUPPLY
    | Action.WITHDRAW_SUPPLY
    | Action.WITHDRAW_DEPOSIT
    | Action.BORROW_DEPOSIT;
}) => {
  const { strategyName, fromChain, toChain } = useTransactionPayloadStore();
  const [isLoading, setIsLoading] = useState(false); // @vaibhav - I dont know kaha load ho rha hai, toh ye dekh lena
  const [showTxDetailsModal, setShowTxDetailsModal] = useState(false);
  
  return (
    <>
      <p className="text-xs text-[#707070] mb-1 ml-1 mt-4">Transaction Overview</p>
      <div className="bg-[#1E1E1E] rounded-xl space-y-3  p-4">
        <div className="flex  items-center justify-between text-gray-300">
          <p>Position changes</p>
          <div className="flex items-center gap-3 ">
            <div className="rounded-md relative">
              {/* Protocol & chain on which position is already there */}
              <Image
                src={protocolNameToImage(strategyName.split('-')[0] as TProtocolName)}
                height={25}
                width={25}
                alt="AAVE"
                className="rounded-full"
              />
              <Image
                src={CHAIN_CONFIG[fromChain].chainImageUrl}
                height={15}
                width={15}
                alt="Base"
                className="absolute -top-1 -right-2 bg-[#36373a] rounded-full"
              />
            </div>

            <FaLongArrowAltRight />

            <div className="rounded-md relative">
              {/* Protocol & chain on which new position to take */}
              <Image
                src={protocolNameToImage(strategyName.split('-')[1] as TProtocolName)}
                height={25}
                width={25}
                alt="AAVE"
                className="rounded-full"
              />
              <Image
                src={CHAIN_CONFIG[toChain].chainImageUrl}
                height={15}
                width={15}
                alt="Base"
                className="absolute -top-1 -right-2 bg-[#36373a] rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex  items-center justify-between text-gray-300">
          <p>Token changes</p>
          <div className="flex items-center gap-3 ">
            <div className="rounded-md relative">
              {/* Token on which position is already there */}
              <Image
                src={'/assets/icons/tokens/eth.png'}
                height={25}
                width={25}
                alt="AAVE"
                className="rounded-full"
              />
            </div>

            <FaLongArrowAltRight />

            <div className="rounded-md relative">
              {/* Token on which new position to take */}
              <Image
                src={'/assets/icons/tokens/cbeth.png'}
                height={25}
                width={25}
                alt="AAVE"
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {type === Action.BORROW_SUPPLY ? (
          <div className="flex items-center justify-between text-gray-300">
            <p>LTV Change</p>
            <div className="flex items-center gap-2">
              <p>1.9</p>
              <FaLongArrowAltRight />
              <p>1.1</p>
            </div>
          </div>
        ) : null}

        {isLoading ? (
          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-400">Fetching estimations</p>
            <Loader inComp={true} />
          </div>
        ) : (
          <div className="flex  items-center justify-between text-gray-300">
            <p>Estimated fee</p>

            <div className="flex items-center gap-2">
              <p>0.001 ETH</p>
              <IoIosArrowDown
                onClick={() => {
                  setShowTxDetailsModal(true);
                }}
                className="cursor-pointer font-semibold text-lg"
              />
            </div>
          </div>
        )}
      </div>

      {showTxDetailsModal ? (
        <TransactionDetailsModal
          onClose={() => {
            setShowTxDetailsModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default MigrateTransactionOverview;
