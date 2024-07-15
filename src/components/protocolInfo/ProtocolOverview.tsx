import React from 'react';
import IconCard from './IconCard';
import { IoWallet, IoStatsChart, IoHeartOutline } from 'react-icons/io5';
import ProtocolHeader from './ProtocolHeader';
type ProtocolOverviewType = {
  protocol: string;
  chain: string;
  networth: number;
};
const ProtocolOverview: React.FC<ProtocolOverviewType> = ({
  protocol,
  chain,
  networth,
}) => {
  return (
    <div className="mb-10 pt-10">
      <ProtocolHeader protocol={protocol} chain={chain} />

      <div className="mt-6 flex gap-20 items-center pb-10 border-b-[0.5px] border-[#3a3a3a]">
        <IconCard
          Icon={IoWallet}
          title="Net worth"
          value={'$' + networth.toFixed(2)}
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
