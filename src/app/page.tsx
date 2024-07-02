'use client';

import DashboardInfoCard from '@/components/(ui)/DashboardInfoCard';
import LendingBorrowingTable from '@/components/tables/LendingBorrowingTable/LendingBorrowingTable';
import { useFetchWalletPortfolio } from '@/server/api/balance';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

const Home = () => {
  const { address } = useAccount();
  const { data: portfolio } = useFetchWalletPortfolio(address as string);
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
      <LendingBorrowingTable />
    </div>
  );
};

export default Home;
