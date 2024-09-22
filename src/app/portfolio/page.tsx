'use client';

import ConnectWallet from '@/components/popups/Wallet/ConnectWallet';
import LoopingPositionTable from '@/components/portfolio/looping-position/LoopingPositionTable';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PositionItem from '@/components/portfolio/PositionItem';
import AssetsToBorrowCard from '@/components/protocolInfo/Borrow/AssetsToBorrowCard';
import BorrowCard from '@/components/protocolInfo/Borrow/BorrowCard';
import ProtocolOverview from '@/components/protocolInfo/ProtocolOverview';
import AssetsToSupplyCard from '@/components/protocolInfo/Supply/AssetsToSupplyCard';
import SuppliesCard from '@/components/protocolInfo/Supply/SuppliesCard';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWalletStore } from '@/redux/hooks';
import { useFetchTokenBalance, useFetchWalletPortfolio } from '@/server/api/balance';
import { TAsset } from '@/types/asset';
import {
  TAssetBalance,
  TFormattedAsset,
  TFormattedAssetBalance,
  TYieldAsset,
} from '@/types/balance';
import { ProtocolType, TProtocolName } from '@/types/protocol';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

const Portfolio = () => {
  const { address } = useAccount();
  const searchParams = useSearchParams();
  const protocol = searchParams.get('protocol');
  const chain = searchParams.get('chain');
  const [tab, setTab] = useState('lendBorrow');
  // const [formattedBalances, setFormattedBalances] = useState<TFormattedAssetBalance[]>();
  const [assets, setAssets] = useState<TAsset[]>();
  const [ethDerivatives, setEthDerivatives] = useState<TAsset[]>([]);
  const [btcDerivatives, setBtcDerivatives] = useState<TAsset[]>([]);
  const [remaining, setRemaining] = useState<TAsset[]>([]);
  const [supplied, setSupplied] = useState<TAssetBalance[]>();
  const [borrowed, setBorrowed] = useState<TAssetBalance[]>();
  const [lendingBalances, setLendingBalances] = useState<TFormattedAssetBalance[]>();
  const [yieldBalances, setYieldBalances] = useState<TFormattedAssetBalance[]>();

  const { data: balances } = useFetchTokenBalance(address);

  const { data: portfolio } = useFetchWalletPortfolio(address);
  const { isConnected } = useWalletStore();

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
        if (asset.protocol.toLowerCase() == protocol.toLowerCase() && asset.chainId == chain) {
          if (BigInt(asset.currentATokenBalance) > BigInt('0')) {
            suppiled.push(asset);
          }
          if (
            BigInt(asset.currentStableDebt) > BigInt('0') ||
            BigInt(asset.currentVariableDebt) > BigInt('0')
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
          asset.chainId == chain &&
          asset.protocolType !== 'Looping'
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
    const lendingTokens: TFormattedAssetBalance[] = [];
    const yieldTokens: TFormattedAssetBalance[] = [];

    data.forEach((d) => {
      const { protocol, chainId, ...rest } = d;

      if (
        d.asset.protocolType === ProtocolType.LENDING ||
        d.asset.protocolType === ProtocolType.LOOPING
      ) {
        const existingProtocol = lendingTokens.find(
          (protocol) =>
            protocol.protocol === d.asset.protocolName && protocol.chainId === d.asset.chainId,
        );

        if (existingProtocol) {
          existingProtocol.assets.push(rest);
        } else {
          lendingTokens.push({
            protocol,
            chainId,
            assets: [rest],
          });
        }
      } else {
        const existingProtocol = yieldTokens.find(
          (protocol) =>
            protocol.protocol === d.asset.protocolName && protocol.chainId === d.asset.chainId,
        );

        if (existingProtocol) {
          existingProtocol.assets.push(rest);
        } else {
          yieldTokens.push({
            protocol,
            chainId,
            assets: [rest],
          });
        }
      }
    });

    setLendingBalances(lendingTokens);
    setYieldBalances(yieldTokens);
  }

  function getCollateralAnddebt(protocolName: string, chainId: string, index: number) {
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
      return parseFloat(formatUnits(portfolio[protocolKey][chainId][index] || 0, 8));
    } else {
      return 0;
    }
  }

  function getTotalCollateralForVault(index: number) {
    let totalCollateral = 0;

    if (!yieldBalances) return;

    yieldBalances[index].assets.forEach(
      (asset) => (totalCollateral += (asset as TFormattedAsset & TYieldAsset).balanceUSD),
    );

    return totalCollateral;
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
            <Tabs onValueChange={setTab} value={tab} className="w-fit dark">
              <TabsList className="grid w-full grid-cols-3 bg-black">
                <TabsTrigger value="lendBorrow">Lend & Borrow</TabsTrigger>
                <TabsTrigger value="vault">Yield vaults</TabsTrigger>
                <TabsTrigger value="loopingPositions">Looping Positions</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Add collapsible from shadcn */}

          {tab === 'lendBorrow'
            ? lendingBalances &&
              portfolio && (
                <div className="flex flex-col gap-3">
                  {lendingBalances.map((balance: TFormattedAssetBalance, index: number) => (
                    <PositionItem
                      key={index}
                      chain={balance.chainId}
                      protocolName={balance.protocol}
                      apy={12}
                      collateral={getCollateralAnddebt(balance.protocol, balance.chainId, 0)}
                      debt={getCollateralAnddebt(balance.protocol, balance.chainId, 1)}
                      positionName={balance.protocol}
                      ratio={12}
                      type="lendBorrow"
                      assets={balance.assets}
                    />
                  ))}
                </div>
              )
            : yieldBalances &&
              portfolio && (
                <div className="flex flex-col gap-3">
                  {yieldBalances.map((balance: TFormattedAssetBalance, index: number) => (
                    <PositionItem
                      key={index}
                      apy={12}
                      collateral={getTotalCollateralForVault(index) || '-'}
                      debt={'-'}
                      positionName={balance.protocol}
                      ratio={0}
                      protocolName={balance.protocol}
                      chain={balance.chainId}
                      type={'vault'}
                      assets={balance.assets}
                    />
                  ))}
                </div>
              )}
        </div>
      )}

      {tab === 'loopingPositions' && (
        <div className="flex flex-col gap-3">
          <LoopingPositionTable data={[]} />
        </div>
      )}

      {!isConnected && <ConnectWallet />}
    </div>
  );
};
export default Portfolio;
