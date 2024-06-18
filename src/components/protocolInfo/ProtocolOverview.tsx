import React from 'react';
import IconCard from './IconCard';
import { IoWallet, IoStatsChart, IoHeartOutline } from 'react-icons/io5';
import ProtocolHeader from './ProtocolHeader';

const ProtocolOverview: React.FC = () => {
  return (
    <div className="mb-10 pt-10">
      <ProtocolHeader />

      <div className="mt-6 flex gap-20 items-center pb-10 border-b-[0.5px] border-[#3a3a3a]">
        <IconCard
          Icon={IoWallet}
          title="Net worth"
          value="$ 14,234.23"
          hoverColor="green"
        />
        <IconCard
          Icon={IoStatsChart}
          title="Net APY"
          value="12.34%"
          hoverColor="yellow"
        />
        <IconCard
          Icon={IoHeartOutline}
          title="Health factor"
          value="23.1"
          hoverColor="red"
        />
      </div>
    </div>
  );
};

export default ProtocolOverview;
