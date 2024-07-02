'use client';

import AssetTable from '@/components/tables/AssetTable/AssetTable';
import EthDerivativesTable from '@/components/tables/EthDerivativesTable/EthDerivativesTable';
import { AssetTableDummyData } from '@/data/DummyData';
import { useFetchAssetBySymbol } from '@/server/api/asset';
import { usePathname } from 'next/navigation';

const AssetPage = () => {
  const pathname = usePathname();
  const { data: assetData } = useFetchAssetBySymbol(pathname.slice(1));

  
  return (
    <div className="w-full">
      <AssetTable type="supply" assetData={assetData} />
      <div>
        <p className="mt-6">You can also deposit ETH derivatives here</p>
        <EthDerivativesTable />
      </div>
    </div>
  );
};

export default AssetPage;
