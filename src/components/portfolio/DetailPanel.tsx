import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { DetailSection } from './DetailSection';
import { MdOutlineArrowOutward } from 'react-icons/md';

interface DetailPanelProps {
  positionName: string;
  collateral: number;
  debt: number;
  ratio: number;
  apy: number;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  positionName,
  collateral,
  debt,
  ratio,
  apy,
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex w-full">
        <DetailSection
          className="flex-[0.4]"
          label="Position Name"
          value={positionName}
        />
        <DetailSection label="Collateral" value={collateral} />
        <DetailSection label="Debt" value={debt} />
        <DetailSection label="Ratio" value={`${ratio}%`} />
        <DetailSection label="APY" value={`${apy}%`} />
        <DetailSection label="LTV" value={`${12}%`} />
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          router.push('/protocol');
        }}
        className="w-[150px] bg-inherit text-white border border-white  mr-2 py-5 flex gap-2 items-center hover:bg-white hover:text-black">
        View more
        <MdOutlineArrowOutward />
      </Button>
    </div>
  );
};

export default DetailPanel;
