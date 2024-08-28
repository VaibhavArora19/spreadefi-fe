import { MdKeyboardArrowDown } from 'react-icons/md';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { PositionCard } from './PositionCard';
import { TokenDetails } from './TokenDetails';
import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { TProtocolName } from '@/types/protocol';
import { TAsset } from '@/types/asset';
import { TFormattedAsset, TLendingAsset, TYieldAsset } from '@/types/balance';

type PositionItemProps = {
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
              assets?.filter(
                (value) =>
                  Number((value as TFormattedAsset & TLendingAsset).currentATokenBalance) > 0 ||
                  (Number((value as TFormattedAsset & TYieldAsset).balanceUSD) > 0 &&
                    value.asset.protocolType != 'Looping'),
              )!
            }
            type="Supplied"
          />

          {type !== 'vault' ? (
            <TokenDetails
              tokens={
                assets?.filter(
                  (value) =>
                    Number((value as TFormattedAsset & TLendingAsset).currentStableDebt) > 0 ||
                    (Number((value as TFormattedAsset & TLendingAsset).currentVariableDebt) > 0 &&
                      value.asset.protocolType != 'Looping'),
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
