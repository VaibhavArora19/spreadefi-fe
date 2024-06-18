'use client';

import AssetsToBorrowCard from '@/components/protocolInfo/Borrow/AssetsToBorrowCard';
import BorrowCard from '@/components/protocolInfo/Borrow/BorrowCard';
import ProtocolOverview from '@/components/protocolInfo/ProtocolOverview';
import AssetsToSupplyCard from '@/components/protocolInfo/Supply/AssetsToSupplyCard';
import SuppliesCard from '@/components/protocolInfo/Supply/SuppliesCard';

const Protocol = () => {
  return (
    <div>
      <ProtocolOverview />
      <div className="flex gap-6 mb-5">
        <SuppliesCard />
        <BorrowCard />
      </div>
      <div className="flex gap-6">
        <AssetsToSupplyCard />
        <AssetsToBorrowCard />
      </div>
    </div>
  );
};

export default Protocol;
