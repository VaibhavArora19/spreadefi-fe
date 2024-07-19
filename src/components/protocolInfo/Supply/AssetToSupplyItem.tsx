import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import SupplyAssetItem from './SupplyAssetItem';
import { TAsset, TBalance } from '@/types/asset';

type AssetToSupplyItemProps = {
  assetsType: string;
  assetsList: TAsset[];
  itemType: 'borrow' | 'supply';
  balances: TBalance;
};

const AssetToSupplyItem: React.FC<AssetToSupplyItemProps> = ({
  assetsType,
  assetsList,
  itemType,
  balances,
}) => {
  const [showAssetList, setShowAssetList] = useState(assetsType === 'StableCoins' ? true : false);

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
          {itemType === 'borrow' ? (
            <>
              <p className="flex-[0.2]">Asset</p>
              <p className="flex-[0.25]">Balance</p>
              <p className="flex-[0.2]">APY</p>
            </>
          ) : (
            <>
              <p className="flex-[0.26]">Asset</p>
              <p className="flex-[0.26]">Balance</p>
              <p className="flex-[0.26]">APY</p>
            </>
          )}
        </div>
      ) : null}

      {showAssetList ? (
        <div className="space-y-2 mt-3">
          {assetsList.map((asset, index) => (
            <SupplyAssetItem itemType={itemType} asset={asset} key={index} balances={balances} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AssetToSupplyItem;
