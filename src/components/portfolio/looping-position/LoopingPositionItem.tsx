import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TFormattedAsset } from '@/types/balance';
import { TProtocolName } from '@/types/protocol';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import { PositionCard } from '../PositionCard';

type LoopingPositionItemProps = {
  positionName: string;
  collateral: string | number;
  debt: string | number;
  ratio: number;
  apy: number;
  chain: string;
  protocolName: TProtocolName;
  type: 'vault' | 'lendBorrow';
  assets?: TFormattedAsset[];
};

const LoopingPositionItem: React.FC<LoopingPositionItemProps> = ({
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
          {/* <TokenDetails
            actionType={type}
            tokens={
              assets?.filter(
                (value) =>
                  Number(value.currentATokenBalance) > 0 && value.asset.protocolType != 'Looping',
              )!
            }
            type="Supplied"
          />

          {type !== 'vault' ? (
            <TokenDetails
              tokens={
                assets?.filter(
                  (value) =>
                    Number(value.currentStableDebt) > 0 ||
                    (Number(value.currentVariableDebt) > 0 &&
                      value.asset.protocolType != 'Looping'),
                )!
              }
              type="Borrowed"
            />
          ) : null} */}
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

export default LoopingPositionItem;
