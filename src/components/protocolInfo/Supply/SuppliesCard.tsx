import Image from 'next/image';
import React from 'react';
import SupplyItem from './SupplyItem';

const SuppliesCard = ({ data }: any) => {
  return (
    <div className="w-full bg-[#111111] p-6 rounded-xl">
      <p className="font-semibold mb-4 border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Your supplies
      </p>
      <div>
        <div className="flex text-xs text-[#707070] mb-3">
          <p className="flex-[0.21]">Asset</p>
          <p className="flex-[0.21]">Balance</p>
          <p className="flex-[0.21]">APY</p>
        </div>
        {data.map((item: any, index: number) => {
          return <SupplyItem key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default SuppliesCard;
