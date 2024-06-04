'use client';

import AssetTable from '@/components/tables/AssetTable/AssetTable';
import EthDerivativesTable from '@/components/tables/EthDerivativesTable/EthDerivativesTable';

const AssetPage = () => {
  return (
    <div className="w-full">
      <AssetTable />

      <div>
        <p className="mt-6">You can also deposit ETH derivatives here</p>
        <EthDerivativesTable />
      </div>
    </div>
  );
};

export default AssetPage;
