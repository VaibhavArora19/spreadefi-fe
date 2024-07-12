'use client';

import DashboardInfoCard from '@/components/(ui)/DashboardInfoCard';
import LendingBorrowingTable from '@/components/tables/LendingBorrowingTable/LendingBorrowingTable';
import { useFetchWalletPortfolio } from '@/server/api/balance';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';
import LoopingStrategyTable from '@/components/tables/LoopinStrategyTable/LoopingStrategyTable';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { useState } from 'react';

const Home = () => {
  const { address } = useAccount();
  // const { data: portfolio } = useFetchWalletPortfolio(address as string);
  const { data: portfolio } = useFetchWalletPortfolio(
    '0x82f12c7032ffEBb69D3eD34e762C6903f1c599d6',
  );

  const [tab, setTab] = useState<string>('lendBorrow');

  return (
    <div>
      <div className="mb-10 flex gap-6">
        <DashboardInfoCard
          iconSrc="/assets/icons/icon1.png"
          label="Net worth"
          value={(
            parseFloat(formatUnits(portfolio?.totalCollateralBase || 0, 6)) -
            parseFloat(formatUnits(portfolio?.totalDebtBase || 0, 6))
          ).toFixed(2)}
          bgColor="bg-gray-200"
          textColor="text-black"
          valueColor="text-black"
        />

        <DashboardInfoCard
          iconSrc="/assets/icons/icon2.png"
          label="Supplied"
          value={parseFloat(
            formatUnits(portfolio?.totalCollateralBase || 0, 6),
          ).toFixed(2)}
        />

        <DashboardInfoCard
          iconSrc="/assets/icons/icon3.png"
          label="Borrowed"
          value={parseFloat(
            formatUnits(portfolio?.totalDebtBase || 0, 6),
          ).toFixed(2)}
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
        <LendingBorrowingTable tab={tab} />
      )}
    </div>
  );
};

export default Home;
