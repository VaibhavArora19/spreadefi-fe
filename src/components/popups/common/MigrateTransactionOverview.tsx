import Image from 'next/image';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

const MigrateTransactionOverview = ({
  type,
}: {
  type: 'borrowAction' | 'migrate';
}) => {
  return (
    <>
      <p className="text-xs text-[#707070] mb-1 ml-1 mt-4">
        Transaction Overview
      </p>
      <div className="bg-[#1E1E1E] rounded-xl space-y-3  p-4">
        <div className="flex  items-center justify-between text-gray-300">
          <p>Protocol changes</p>
          <div className="flex items-center gap-3 ">
            <div className="rounded-md relative">
              {/* Protocol & chain on which position is already there */}
              <Image
                src={'/assets/icons/protocols/aave.png'}
                height={25}
                width={25}
                alt="AAVE"
                className="rounded-full"
              />
              <Image
                src={'/assets/icons/chains/base.png'}
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
                src={'/assets/icons/protocols/compound.png'}
                height={25}
                width={25}
                alt="AAVE"
                className="rounded-full"
              />
              <Image
                src={'/assets/icons/chains/op.png'}
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

        {type === 'borrowAction' ? (
          <div className="flex items-center justify-between text-gray-300">
            <p>LTV Change</p>
            <div className="flex items-center gap-2">
              <p>1.9</p>
              <FaLongArrowAltRight />
              <p>1.1</p>
            </div>
          </div>
        ) : null}

        <div className="flex  items-center justify-between text-gray-300">
          <p>Network Fee</p>
          <p>0.001</p>
        </div>
      </div>
    </>
  );
};

export default MigrateTransactionOverview;
