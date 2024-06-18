import React from 'react';
import { IconType } from 'react-icons';

interface IconCardProps {
  Icon: IconType;
  title: string;
  value: string | number;
  hoverColor: string;
}

const IconCard: React.FC<IconCardProps> = ({
  Icon,
  title,
  value,
  hoverColor,
}) => {
  return (
    <div className="flex items-center gap-5">
      <Icon
        size={40}
        className={`bg-gray-400/20 py-2 text-gray-400 rounded-md hover:text-${hoverColor}-400 hover:bg-${hoverColor}-400/20 cursor-pointer`}
      />
      <div>
        <p className="text-xs text-[#707070] mb-1">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default IconCard;
