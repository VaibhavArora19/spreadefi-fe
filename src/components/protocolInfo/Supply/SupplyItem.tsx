import Image from 'next/image';
import React from 'react';

const SupplyItem = () => {
  return (
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
        <button className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
          Withdraw
        </button>
        <button className="bg-transparent text-white py-2  px-4 text-xs rounded-md border border-white hover:bg-white hover:text-black">
          Migrate
        </button>
      </div>
    </div>
  );
};

export default SupplyItem;
