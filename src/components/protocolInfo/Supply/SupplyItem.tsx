import SupplyModal from '@/components/popups/SupplyModal/SupplyModal';
import Image from 'next/image';
import React, { useState } from 'react';

const SupplyItem = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex gap-[6px] flex-[0.21]">
          <Image
            src={'/assets/icons/tokens/eth.png'}
            height={22}
            width={25}
            alt="ETH"
          />
          <p>ETH</p>
        </div>
        <p className="flex-[0.21]">$23,234</p>
        <p className="flex-[0.21]">12.3%</p>
        <div className="flex gap-4 flex-[0.35]">
          <button
            onClick={() => {
              setShowWithdrawModal(true);
            }}
            className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
            Withdraw
          </button>
          <button className="bg-transparent text-white py-2  px-4 text-xs rounded-md border border-white hover:bg-white hover:text-black">
            Migrate
          </button>
        </div>
      </div>

      {showWithdrawModal ? (
        <SupplyModal
          onClose={() => {
            setShowWithdrawModal(false);
          }}
          type="withdraw"
        />
      ) : null}
    </>
  );
};

export default SupplyItem;
