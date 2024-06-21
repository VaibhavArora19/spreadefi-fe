'use client';

import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PositionItem from '@/components/portfolio/PositionItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TProtocolName } from '@/types/protocol';
import React, { useState } from 'react';

const Portfolio = () => {
  const [tab, setTab] = useState('lendBorrow');
  return (
    <div className="w-[95%] mx-auto">
      {/* Portfolio dabba */}
      <PortfolioCard />

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
        <div className="flex flex-col gap-3">
          <PositionItem
            apy={12}
            collateral={2312}
            debt={1232}
            positionName="AAVE V3 Composition"
            ratio={12}
            protocolName={TProtocolName.AAVE}
            chain="8453"
            type="lendBorrow"
          />
          <PositionItem
            chain="10"
            protocolName={TProtocolName.COMPOUND}
            apy={12}
            collateral={2312}
            debt={1232}
            positionName="Compound V3 Position"
            ratio={12}
            type="lendBorrow"
          />
        </div>
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
  );
};

export default Portfolio;
