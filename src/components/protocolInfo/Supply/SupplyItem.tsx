import MigrateActionsModal from '@/components/popups/MigrateModal/MigrateActionsModal';
import WithdrawModal from '@/components/popups/Withdraw/WithdrawModal';
import SupplyModal from '@/components/popups/common/SupplyModal';
import { TAsset } from '@/types/asset';
import Image from 'next/image';
import React, { useState } from 'react';

type SupplyItemProps = {
  data: { asset: TAsset; currentATokenBalance: string };
};

const SupplyItem: React.FC<SupplyItemProps> = ({ data }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showMigrateModal, setShowMigrateModal] = useState(false);
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
          <p>{data.asset.assetSymbol}</p>
        </div>
        <p className="flex-[0.21]">{data.currentATokenBalance.slice(0, 4)}</p>
        <p className="flex-[0.21]">{data.asset.assetSupplyApy.toFixed(2)}%</p>
        <div className="flex gap-4 flex-[0.35]">
          <button
            onClick={() => {
              setShowWithdrawModal(true);
            }}
            className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
            Withdraw
          </button>
          <button
            onClick={() => {
              setShowMigrateModal(true);
            }}
            className="bg-transparent text-white py-2  px-4 text-xs rounded-md border border-white hover:bg-white hover:text-black">
            Migrate
          </button>
        </div>
      </div>

      {showWithdrawModal ? (
        <WithdrawModal
          onClose={() => {
            setShowWithdrawModal(false);
          }}
        />
      ) : null}

      {showMigrateModal ? (
        <MigrateActionsModal
          onClose={() => {
            setShowMigrateModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default SupplyItem;
