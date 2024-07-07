import BorrowAndActionModal from '@/components/popups/Borrow&Action/BorrowAndActionModal';
import RepayModal from '@/components/popups/Repay/RepayModal';
import Image from 'next/image';
import React, { useState } from 'react';

const BorrowItem = () => {
  const [showBorrowActionModal, setShowBorrowActionModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);

  return (
    <div className="flex items-center">
      <div className="flex gap-[6px] flex-[0.21]">
        <Image
          src={'/assets/icons/tokens/cbeth.png'}
          height={22}
          width={25}
          alt="cbETH"
        />
        <p>cbETH</p>
      </div>
      <p className="flex-[0.21]">$23,234</p>
      <p className="flex-[0.18]">12.3%</p>
      <div className="flex gap-4 flex-[0.37]">
        <button
          onClick={() => {
            setShowRepayModal(true);
          }}
          className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
          Repay
        </button>
        <button
          onClick={() => {
            setShowBorrowActionModal(true);
          }}
          className="bg-transparent text-white py-2 w-[120px] text-xs rounded-md border border-white hover:bg-white hover:text-black">
          Borrow & Action
        </button>
      </div>

      {showBorrowActionModal ? (
        <BorrowAndActionModal
          onClose={() => {
            setShowBorrowActionModal(false);
          }}
        />
      ) : null}

      {showRepayModal ? (
        <RepayModal
          onClose={() => {
            setShowRepayModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default BorrowItem;
