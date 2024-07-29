import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TProtocolName } from '@/types/protocol';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import TransactionDetailsModal from './TransactionDetailsModal';
import Loader from '@/components/(ui)/Loader';

const TransactionOverview = () => {
  const [isLoading, setIsLoading] = useState(false); // @vaibhav - I dont know kaha load ho rha hai, toh ye dekh lena
  const [showTxDetailsModal, setShowTxDetailsModal] = useState(false);
  return (
    <>
      <p className="text-xs text-[#707070] mb-1 ml-1 mt-4">Transaction Overview</p>
      <div className="bg-[#1E1E1E] rounded-xl  p-4 min-h-[130px]">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <p className="text-sm text-purple-400">Fetching estimations</p>
            <Loader inComp={true} />
          </div>
        ) : (
          <div className="space-y-3 ">
            <div className="flex  items-center justify-between text-gray-300">
              <p>Deposit token</p>
              <div className="flex items-center gap-3 ">
                <div className="rounded-md relative">
                  {/* Token & chain (source) */}
                  <Image
                    src={'/assets/icons/tokens/usdc.png'}
                    height={25}
                    width={25}
                    alt="AAVE"
                    className="rounded-full"
                  />
                  <Image
                    src="/assets/icons/chains/linea.png"
                    height={15}
                    width={15}
                    alt="Base"
                    className="absolute -top-1 -right-2 bg-[#36373a] rounded-full"
                  />
                </div>

                <FaLongArrowAltRight />

                <div className="rounded-md relative">
                  {/* token & chain (destination) */}
                  <Image
                    src={'/assets/icons/tokens/usdt.png'}
                    height={25}
                    width={25}
                    alt="AAVE"
                    className="rounded-full"
                  />
                  <Image
                    src="/assets/icons/chains/base.png"
                    height={15}
                    width={15}
                    alt="Base"
                    className="absolute -top-1 -right-2 bg-[#36373a] rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex  items-center justify-between text-gray-300">
              <p>Minimum recieved</p>
              <p>0.002 ETH</p>
            </div>

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

export default TransactionOverview;
