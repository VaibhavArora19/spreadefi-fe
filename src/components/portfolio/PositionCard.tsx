import Image from 'next/image';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Button } from '../ui/button';
import DetailPanel from './DetailPanel';

interface PositionCardProps {
  iconSrc: string;
  chainIconSrc: string;
  positionName: string;
  collateral: string | number;
  debt: string | number;
  ratio: number;
  apy: number;
  type: 'lendBorrow' | 'vault';
  chainId: string;
}

export const PositionCard: React.FC<PositionCardProps> = ({
  iconSrc,
  chainIconSrc,
  positionName,
  collateral,
  debt,
  ratio,
  apy,
  type,
  chainId,
}) => (
  <div className="flex gap-10 items-center border-b border-b-[#2a2a2a] pb-4">
    <div className="rounded-md relative">
      <Image
        src={iconSrc}
        height={80}
        width={80}
        alt="Balancer"
        className="rounded-full p-1 bg-[#36373a]"
      />
      <Image
        src={chainIconSrc}
        height={30}
        width={30}
        alt="Base"
        className="absolute -top-2 -right-2 bg-[#36373a] p-[4px] rounded-full"
      />
    </div>
    <DetailPanel
      apy={apy}
      collateral={collateral}
      debt={debt}
      positionName={positionName}
      ratio={ratio}
      type={type}
      chainId={chainId}
    />
  </div>
);
