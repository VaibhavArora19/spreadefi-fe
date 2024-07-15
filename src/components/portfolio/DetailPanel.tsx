import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { DetailSection } from './DetailSection';
import { MdOutlineArrowOutward } from 'react-icons/md';

interface DetailPanelProps {
  positionName: string;
  collateral: string | number;
  debt: string | number;
  ratio: number;
  apy: number;
  type: 'vault' | 'lendBorrow';
  chainId: string;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  positionName,
  collateral,
  debt,
  ratio,
  apy,
  type,
  chainId,
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
        {type === 'lendBorrow' ? (
          <>
            <DetailSection label="Debt" value={debt} />
            <DetailSection label="LTV" value={`${12}%`} />
          </>
        ) : null}
        <DetailSection label="Ratio" value={`${ratio}%`} />
        <DetailSection label="APY" value={`${apy}%`} />
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/portfolio?protocol=${positionName}&chain=${chainId}`);
        }}
        className="w-[150px] bg-inherit text-white border border-white  mr-2 py-5 flex gap-2 items-center hover:bg-white hover:text-black">
        View more
        <MdOutlineArrowOutward />
      </Button>
    </div>
  );
};

export default DetailPanel;
