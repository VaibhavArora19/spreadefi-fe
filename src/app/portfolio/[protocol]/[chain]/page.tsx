'use client';

import AssetsToBorrowCard from '@/components/protocolInfo/Borrow/AssetsToBorrowCard';
import BorrowCard from '@/components/protocolInfo/Borrow/BorrowCard';
import ProtocolOverview from '@/components/protocolInfo/ProtocolOverview';
import AssetsToSupplyCard from '@/components/protocolInfo/Supply/AssetsToSupplyCard';
import SuppliesCard from '@/components/protocolInfo/Supply/SuppliesCard';
import { capitalize } from '@/helpers';
import { useFetchSpecificProtocolBalance } from '@/server/api/balance';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Protocol = () => {
  const params = useParams();
  const [ethDerivatives, setEthDerivatives] = useState([]);
  const [btcDerivatives, setBtcDerivatives] = useState([]);
  const [remaining, setRemaining] = useState([]);

  const { data: assetData } = useFetchSpecificProtocolBalance(
    '0x82f12c7032ffEBb69D3eD34e762C6903f1c599d6',
    capitalize(params.protocol as string),
    params.chain as string,
  );

  useEffect(() => {
    if (assetData?.assets) {
      const ethDerivatives: any = [];
      const btcDerivatives: any = [];
      const remaining: any = [];

      assetData.assets.forEach((asset: any) => {
        if (asset.assetSymbol.includes('ETH')) {
          ethDerivatives.push(asset);
        } else if (asset.assetSymbol.includes('BTC')) {
          btcDerivatives.push(asset);
        } else {
          remaining.push(asset);
        }
      });

      setEthDerivatives(ethDerivatives);
      setBtcDerivatives(btcDerivatives);
      setRemaining(remaining);
    }
  }, [assetData]);

  return (
    <div>
      {assetData ? (
        <div>
          <ProtocolOverview />
          <div className="flex gap-6 mb-5">
            <SuppliesCard data={assetData?.supplied} />
            <BorrowCard data={assetData?.borrowed} />
          </div>
          <div className="flex gap-6">
            <AssetsToSupplyCard
              ethDerivatives={ethDerivatives}
              btcDerivatives={btcDerivatives}
              remaining={remaining}
            />
            <AssetsToBorrowCard
              ethDerivatives={ethDerivatives}
              btcDerivatives={btcDerivatives}
              remaining={remaining}
            />
          </div>{' '}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Protocol;
