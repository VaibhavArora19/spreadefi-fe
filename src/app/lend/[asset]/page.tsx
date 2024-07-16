'use client';

import AssetTable from '@/components/tables/AssetTable/AssetTable';
import EthDerivativesTable from '@/components/tables/EthDerivativesTable/EthDerivativesTable';
import { useFetchAssetBySymbol } from '@/server/api/asset';
import {  useParams } from 'next/navigation';

const AssetPage = () => {
  const paramName = useParams();

  const { data: assetData } = useFetchAssetBySymbol(paramName.asset.toString());

  return (
    <div className="w-full">
      <AssetTable type="supply" assetData={assetData?.lendingTableData} />
      <div>
        <p className="mt-6">You can also deposit ETH derivatives here</p>
        <EthDerivativesTable />
      </div>
    </div>
  );
};

export default AssetPage;
