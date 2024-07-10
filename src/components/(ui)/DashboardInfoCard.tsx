import Image from 'next/image';
import React from 'react';

type DashboardInfoCardProps = {
  iconSrc: string;
  label: string;
  value: string;
  bgColor?: string;
  textColor?: string;
  valueColor?: string;
};

const DashboardInfoCard: React.FC<DashboardInfoCardProps> = ({
  iconSrc,
  label,
  value,
  bgColor = 'bg-[#151515]',
  textColor = 'text-[#707070]',
  valueColor = 'text-white',
}) => {
  return (
    <div className={`flex flex-col ${bgColor} p-6 w-[300px] rounded-lg`}>
      <Image
        src={iconSrc}
        height={35}
        width={35}
        alt="icon"
        className="bg-[#2E2E2E] p-2 rounded-md mb-6"
      />
      <p className={`text-sm font-light mb-1 ${textColor}`}>{label}</p>
      <p className={`text-2xl font-semibold mb-2 ${valueColor}`}>
        {'$' + value}
      </p>
    </div>
  );
};

export default DashboardInfoCard;
