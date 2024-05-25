"use client";

import DashboardInfoCard from "@/components/(ui)/DashboardInfoCard";
import LendingBorrowingTable from "@/components/tables/LendingBorrowingTable/LendingBorrowingTable";

const Home = () => {
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
      <LendingBorrowingTable />
    </div>
  );
};

export default Home;
