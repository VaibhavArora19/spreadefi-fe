'use client';

import DashboardInfoCard from '@/components/(ui)/DashboardInfoCard';
import LendingBorrowingTable from '@/components/tables/LendingBorrowingTable/LendingBorrowingTable';
import LoopingStrategyTable from '@/components/tables/LoopinStrategyTable/LoopingStrategyTable';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { useState } from 'react';

const Home = () => {
  const [tab, setTab] = useState<string>('lendBorrow');

  return (
    <div>
      <div className="mb-10 flex gap-6">
        <DashboardInfoCard
          iconSrc="/assets/icons/icon1.png"
          label="Net worth"
          value="$2,123,875"
          bgColor="bg-gray-200"
          textColor="text-black"
          valueColor="text-black"
        />

        <DashboardInfoCard
          iconSrc="/assets/icons/icon2.png"
          label="Supplied"
          value="$4,123,875"
        />

        <DashboardInfoCard
          iconSrc="/assets/icons/icon3.png"
          label="Borrowed"
          value="$2,623,054"
        />
      </div>

      <Tabs onValueChange={setTab} value={tab} className="w-[520px] dark mb-2">
        <TabsList className="grid w-full grid-cols-3 bg-black">
          <TabsTrigger value="lendBorrow">Lend & Borrow</TabsTrigger>
          <TabsTrigger value="vault">Yield vaults</TabsTrigger>
          <TabsTrigger value="loopingStrategy">Looping Strategy</TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === 'loopingStrategy' ? (
        <LoopingStrategyTable />
      ) : (
        <LendingBorrowingTable />
      )}
    </div>
  );
};

export default Home;
