'use client';

import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PositionItem from '@/components/portfolio/PositionItem';
import AssetsToBorrowCard from '@/components/protocolInfo/Borrow/AssetsToBorrowCard';
import BorrowCard from '@/components/protocolInfo/Borrow/BorrowCard';
import ProtocolOverview from '@/components/protocolInfo/ProtocolOverview';
import AssetsToSupplyCard from '@/components/protocolInfo/Supply/AssetsToSupplyCard';
import SuppliesCard from '@/components/protocolInfo/Supply/SuppliesCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useFetchTokenBalance,
  useFetchWalletPortfolio,
} from '@/server/api/balance';
import { TAsset } from '@/types/asset';
import {
  TAssetBalance,
  TFormattedAsset,
  TFormattedAssetBalance,
} from '@/types/balance';
import { TProtocolName } from '@/types/protocol';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

const Portfolio = () => {
  const searchParams = useSearchParams();
  const protocol = searchParams.get('protocol');
  const chain = searchParams.get('chain');
  const [tab, setTab] = useState('lendBorrow');
  const [formattedBalances, setFormattedBalances] =
    useState<TFormattedAssetBalance[]>();
  const [assets, setAssets] = useState<TAsset[]>();
  const [ethDerivatives, setEthDerivatives] = useState<TAsset[]>([]);
  const [btcDerivatives, setBtcDerivatives] = useState<TAsset[]>([]);
  const [remaining, setRemaining] = useState<TAsset[]>([]);
  const [supplied, setSupplied] = useState<TAssetBalance[]>();
  const [borrowed, setBorrowed] = useState<TAssetBalance[]>();

  const { address } = useAccount();

  const { data: balances } = useFetchTokenBalance(
    '0x82f12c7032ffEBb69D3eD34e762C6903f1c599d6',
  );

  const { data: portfolio } = useFetchWalletPortfolio(
    '0x82f12c7032ffEBb69D3eD34e762C6903f1c599d6',
  );

  useEffect(() => {
    if (balances) {
      formatData(balances.filteredBalances);
      setAssets(balances.assets);
    }
  }, [balances]);

  useEffect(() => {
    if (balances && protocol && chain) {
      const suppiled: TAssetBalance[] = [];
      const borrowed: TAssetBalance[] = [];

      balances.filteredBalances.forEach((asset: TAssetBalance) => {
        if (
          asset.protocol.toLowerCase() == protocol.toLowerCase() &&
          asset.chainId == chain
        ) {
          if (Number(asset.currentATokenBalance) > 0) {
            suppiled.push(asset);
          }
          if (
            Number(asset.currentStableDebt) > 0 ||
            Number(asset.currentVariableDebt) > 0
          ) {
            borrowed.push(asset);
          }
        }
      });

      setSupplied(suppiled);
      setBorrowed(borrowed);
    }
  }, [balances, protocol, chain]);

  useEffect(() => {
    if (assets && protocol && chain) {
      const ethDerivatives: TAsset[] = [];
      const btcDerivatives: TAsset[] = [];
      const remaining: TAsset[] = [];

      assets.forEach((asset) => {
        if (
          asset.protocolName.toLowerCase() == protocol.toLowerCase() &&
          asset.chainId == chain
        ) {
          if (asset.assetSymbol.includes('ETH')) {
            ethDerivatives.push(asset);
          } else if (asset.assetSymbol.includes('BTC')) {
            btcDerivatives.push(asset);
          } else {
            remaining.push(asset);
          }
        }
      });

      setEthDerivatives(ethDerivatives);
      setBtcDerivatives(btcDerivatives);
      setRemaining(remaining);
    }
  }, [assets, protocol, chain]);

  function formatData(data: TAssetBalance[]) {
    const formattedData: TFormattedAssetBalance[] = [];

    data.forEach((item: TAssetBalance) => {
      const { protocol, chainId, ...rest } = item;

      let existingEntry = formattedData.find(
        (entry: TFormattedAssetBalance) =>
          entry.protocol === protocol && entry.chainId === chainId,
      );

      if (existingEntry) {
        existingEntry.assets.push(rest);
      } else {
        formattedData.push({
          protocol,
          chainId,
          assets: [rest],
        });
      }
    });

    setFormattedBalances(formattedData);
  }

  function getCollateralAnddebt(
    protocolName: string,
    chainId: string,
    index: number,
  ) {
    let protocolKey;

    if (protocolName === 'Aave') {
      protocolKey = 'aaveBalances';
    } else if (protocolName === 'Seamless') {
      protocolKey = 'seamlessBalances';
    } else if (protocolName === 'Zerolend') {
      protocolKey = 'zerolendBalances';
    } else {
      return `Protocol ${protocolName} not found.`;
    }

    if (portfolio[protocolKey] && portfolio[protocolKey][chainId]) {
      return parseFloat(
        formatUnits(portfolio[protocolKey][chainId][index] || 0, 8),
      );
    } else {
      return 0;
    }
  }

  return (
    <div>
      {chain && protocol ? (
        <div>
          {portfolio && supplied && borrowed ? (
            <div>
              <ProtocolOverview
                protocol={protocol}
                chain={chain}
                networth={
                  Number(getCollateralAnddebt(protocol, chain, 0)) -
                  Number(getCollateralAnddebt(protocol, chain, 1))
                }
              />
              <div className="flex gap-6 mb-5">
                <SuppliesCard data={supplied} />
                <BorrowCard data={borrowed} />
              </div>
              <div className="flex gap-6">
                <AssetsToSupplyCard
                  ethDerivatives={ethDerivatives}
                  btcDerivatives={btcDerivatives}
                  remaining={remaining}
                  balances={portfolio.chainBalance[chain]}
                />
                <AssetsToBorrowCard
                  ethDerivatives={ethDerivatives}
                  btcDerivatives={btcDerivatives}
                  remaining={remaining}
                  balances={portfolio.chainBalance[chain]}
                />
              </div>{' '}
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
      ) : (
        <div className="w-[95%] mx-auto">
          {/* Portfolio dabba */}
          <PortfolioCard portfolio={portfolio} />

          <div className="mt-10 mb-6">
            <Tabs onValueChange={setTab} value={tab} className="w-[300px] dark">
              <TabsList className="grid w-full grid-cols-2 bg-black">
                <TabsTrigger value="lendBorrow">Lend & Borrow</TabsTrigger>
                <TabsTrigger value="vault">Yield vaults</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Add collapsible from shadcn */}

          {tab === 'lendBorrow' ? (
            formattedBalances &&
            portfolio && (
              <div className="flex flex-col gap-3">
                {formattedBalances.map(
                  (balance: TFormattedAssetBalance, index: number) => (
                    <PositionItem
                      key={index}
                      chain={balance.chainId}
                      protocolName={balance.protocol}
                      apy={12}
                      collateral={getCollateralAnddebt(
                        balance.protocol,
                        balance.chainId,
                        0,
                      )}
                      debt={getCollateralAnddebt(
                        balance.protocol,
                        balance.chainId,
                        1,
                      )}
                      positionName={balance.protocol}
                      ratio={12}
                      type="lendBorrow"
                      assets={balance.assets}
                    />
                  ),
                )}
              </div>
            )
          ) : (
            <div className="flex flex-col gap-3">
              <PositionItem
                apy={12}
                collateral={2312}
                debt={1232}
                positionName="Vault Position 1"
                ratio={12}
                protocolName={TProtocolName.Balancer}
                chain="8453"
                type={'vault'}
              />
              <PositionItem
                chain="10"
                protocolName={TProtocolName.COMPOUND}
                apy={12}
                collateral={2312}
                debt={1232}
                positionName="Vault Position 2"
                ratio={12}
                type={'vault'}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
