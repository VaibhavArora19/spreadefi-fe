'use client';

import DashboardInfoCard from '@/components/(ui)/DashboardInfoCard';
import { LeveragedStaking } from '@/components/portfolio/looping-position/LeveragedStaking';
import LendingBorrowingTable from '@/components/tables/LendingBorrowingTable/LendingBorrowingTable';
import PerpetualPositionsTable from '@/components/tables/PerpetualPositions/PerpetualPositionsTable';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFetchAssets } from '@/server/api/asset';
import { useFetchWalletPortfolio } from '@/server/api/balance';
import { useFetchLoopingStrategies } from '@/server/api/looping-strategies';
import { useState } from 'react';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

const Home = () => {
  const { address } = useAccount();
  const { data: portfolio } = useFetchWalletPortfolio(address);
  const { data, isLoading, isError, error } = useFetchAssets();

  const [tab, setTab] = useState<string>('lendBorrow');
  const { data: perpetualPositionsData } = useFetchLoopingStrategies();
  const { data: leveragedStakingData } = useFetchLoopingStrategies(true);

  return (
    <div>
      <div className="mb-10 flex gap-6">
        <DashboardInfoCard
          iconSrc="/assets/icons/icon1.png"
          label="Net worth"
          value={(
            parseFloat(formatUnits(portfolio?.totalCollateralBase || 0, 8)) -
            parseFloat(formatUnits(portfolio?.totalDebtBase || 0, 8))
          ).toFixed(2)}
          bgColor="bg-gray-200"
          textColor="text-black"
          valueColor="text-black"
        />

        <DashboardInfoCard
          iconSrc="/assets/icons/icon2.png"
          label="Supplied"
          value={parseFloat(formatUnits(portfolio?.totalCollateralBase || 0, 8)).toFixed(2)}
        />

        <DashboardInfoCard
          iconSrc="/assets/icons/icon3.png"
          label="Borrowed"
          value={parseFloat(formatUnits(portfolio?.totalDebtBase || 0, 8)).toFixed(2)}
        />
      </div>

      <Tabs onValueChange={setTab} value={tab} className="w-fit dark mb-2">
        <TabsList className="flex md:max-w-full max-w-[310px] w-max justify-start overflow-auto bg-black">
          <TabsTrigger className="min-w-fit" value="lendBorrow">
            Lend & Borrow
          </TabsTrigger>
          <TabsTrigger className="min-w-fit" value="vault">
            Yield vaults
          </TabsTrigger>
          <TabsTrigger className="min-w-fit" value="leveragedStaking">
            Leveraged Staking
          </TabsTrigger>
          <TabsTrigger className="min-w-fit" value="perpetualPositions">
            Perpetual Positions
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === 'perpetualPositions' && (
        <PerpetualPositionsTable perpetualPositionsData={perpetualPositionsData || []} />
      )}
      {tab === 'leveragedStaking' && (
        <LeveragedStaking leveragedStakingData={leveragedStakingData || []} />
      )}
      {(tab === 'lendBorrow' || tab === 'vault') && (
        <LendingBorrowingTable
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          tab={tab}
        />
      )}
    </div>
  );
};

export default Home;
