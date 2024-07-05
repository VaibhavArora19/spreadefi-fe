import { TAsset } from '@/types/asset';
import Image from 'next/image';
import React from 'react';

type BorrowItemProps = {
  data: { asset: TAsset; currentVariableDebt: string };
};

const BorrowItem: React.FC<BorrowItemProps> = ({ data }) => {
  return (
    <div className="flex items-center">
      <div className="flex gap-[6px] flex-[0.21]">
        <Image
          src={'/assets/icons/tokens/cbeth.png'}
          height={22}
          width={25}
          alt="cbETH"
        />
        <p>{data.asset.assetSymbol}</p>
      </div>
      <p className="flex-[0.21]">{data.currentVariableDebt.slice(0, 4)}</p>
      <p className="flex-[0.18]">{data.asset.assetBorrowApy.toFixed(2)}%</p>
      <div className="flex gap-4 flex-[0.37]">
        <button className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
          Repay
        </button>
        <button className="bg-transparent text-white py-2 w-[120px] text-xs rounded-md border border-white hover:bg-white hover:text-black">
          Borrow & Action
        </button>
      </div>
    </div>
  );
};

export default BorrowItem;
