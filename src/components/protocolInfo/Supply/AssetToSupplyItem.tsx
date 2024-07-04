import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import SupplyAssetItem from './SupplyAssetItem';
import { TStableCoinData } from '@/data/AssetsData';

type AssetToSupplyItemProps = {
  assetsType: string;
  assetsList: TStableCoinData[];
  itemType: 'borrow' | 'supply';
};

const AssetToSupplyItem: React.FC<AssetToSupplyItemProps> = ({
  assetsType,
  assetsList,
  itemType,
}) => {
  const [showAssetList, setShowAssetList] = useState(
    assetsType === 'StableCoins' ? true : false,
  );

  console.log(assetsList);

  return (
    <div className="p-4 rounded-md bg-[#1a1a1a] mb-2 cursor-pointer hover:bg-[#1e1e1e]">
      <div
        onClick={() => {
          setShowAssetList(!showAssetList);
        }}
        className="flex justify-between items-center">
        <p>{assetsType}</p>

        {showAssetList ? (
          <>
            <IoIosArrowUp />
          </>
        ) : (
          <IoIosArrowDown />
        )}
      </div>

      {showAssetList ? (
        <div className="flex text-xs text-[#707070] mb-2 mt-4">
          <p className="flex-[0.26]">Asset</p>
          <p className="flex-[0.26]">Balance</p>
          <p className="flex-[0.26]">APY</p>
        </div>
      ) : null}

      {showAssetList ? (
        <div className="space-y-2 mt-3">
          {assetsList.map((asset, index) => (
            <SupplyAssetItem itemType={itemType} asset={asset} key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AssetToSupplyItem;
