import { useTransactionPayloadStore, useTransactionStore } from '@/redux/hooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import TransactionDetailsModal from './TransactionDetailsModal';
import Loader from '@/components/(ui)/Loader';
import { TTransactionResponse } from '@/types/transaction';
import { Action } from '@/types/strategy';
import { ethers } from 'ethers';
import { isBytesLike } from 'ethers/lib/utils';

const TransactionOverview = () => {
  const [showTxDetailsModal, setShowTxDetailsModal] = useState(false);
  const [squidTx, setSquidTx] = useState<TTransactionResponse[number] | null>(null);
  const [fees, setFees] = useState<string | null>(null);
  const { isLoading, transactions } = useTransactionStore();
  const { fromAmount } = useTransactionPayloadStore();

  useEffect(() => {
    if (transactions.length > 0) {
      const squidTransaction = transactions.find((tx) => tx.type === Action.SQUID);

      if (squidTransaction && !isBytesLike(squidTransaction.tx)) {
        setSquidTx(squidTransaction);

        const unformattedFees =
          BigInt(
            squidTransaction.tx.estimate.feeCosts[0]
              ? squidTransaction.tx.estimate.feeCosts[0]?.amount
              : '0',
          ) +
          BigInt(
            squidTransaction.tx.estimate.feeCosts[1]
              ? squidTransaction.tx.estimate.feeCosts[1]?.amount
              : '0',
          ) +
          BigInt(
            squidTransaction.tx.estimate.gasCosts[0]
              ? squidTransaction.tx.estimate.gasCosts[0]?.amount
              : '0',
          );

        setFees(ethers.utils.formatUnits(unformattedFees, 18).substring(0, 7));
      } else {
        setSquidTx(null);
        setFees(null);
      }
    } else {
      setSquidTx(null);
      setFees(null);
    }
  }, [transactions]);

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
              <p>
                {!isLoading && squidTx && !isBytesLike(squidTx.tx)
                  ? (squidTx.tx?.estimate).toAmountMinUSD + '$'
                  : fromAmount}
              </p>
            </div>

            <div className="flex  items-center justify-between text-gray-300">
              <p>Estimated fee</p>

              <div className="flex items-center gap-2">
                <p>{!isLoading && fees ? fees : '0'} ETH</p>
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

      {!isLoading && squidTx && showTxDetailsModal ? (
        <TransactionDetailsModal
          squidTx={squidTx}
          onClose={() => {
            setShowTxDetailsModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default TransactionOverview;
