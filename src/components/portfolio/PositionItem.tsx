import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { PositionCard } from './PositionCard';
import { TokenDetails } from './TokenDetails';
import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TProtocolName } from '@/types/protocol';
import { TAsset } from '@/types/asset';

type PositionItemProps = {
  positionName: string;
  collateral: string | number;
  debt: string | number;
  ratio: number;
  apy: number;
  chain: string;
  protocolName: TProtocolName;
  type: 'vault' | 'lendBorrow';
  assets?: {
    asset: TAsset;
    currentATokenBalance: number;
    currentStableDebt: number;
    currentVariableDebt: number;
  }[];
};

const PositionItem: React.FC<PositionItemProps> = ({
  positionName,
  collateral,
  debt,
  ratio,
  apy,
  chain,
  protocolName,
  type,
  assets,
}) => (
  <div className="w-full bg-[#181818] p-4 pb-3 rounded-md">
    <Collapsible>
      <CollapsibleTrigger className="w-full h-full">
        <PositionCard
          iconSrc={protocolNameToImage(protocolName)}
          chainIconSrc={CHAIN_CONFIG[chain].chainImageUrl}
          positionName={positionName}
          collateral={collateral}
          debt={debt}
          ratio={ratio}
          apy={apy}
          type={type}
          chainId={chain}
        />
        <MdKeyboardArrowDown className="text-center text-white w-full mt-2 text-xl" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <TokenDetails
            actionType={type}
            tokens={
              assets?.filter((value: any) => value.currentATokenBalance > 0)!
            }
            type="Supplied"
          />

          {type !== 'vault' ? (
            <TokenDetails
              tokens={
                assets?.filter(
                  (value) =>
                    value.currentStableDebt > 0 ||
                    value.currentVariableDebt > 0,
                )!
              }
              type="Borrowed"
            />
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

export default PositionItem;
