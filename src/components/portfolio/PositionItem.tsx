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

type PositionItemProps = {
  positionName: string;
  collateral: number;
  debt: number;
  ratio: number;
  apy: number;
  chain: string;
  protocolName: TProtocolName;
  type: 'vault' | 'lendBorrow';
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
        />
        <MdKeyboardArrowDown className="text-center text-white w-full mt-2 text-xl" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          <TokenDetails
            tokens={[
              {
                name: 'ETH',
                amount: '2.332 ETH',
                usdValue: '$23,193.2',
                iconSrc: '/assets/icons/tokens/eth.png',
              },
              {
                name: 'ezETH',
                amount: '2.332 ezETH',
                usdValue: '$23,193.2',
                iconSrc: '/assets/icons/tokens/ezeth.png',
              },
            ]}
            type="Supplied"
          />

          {type !== 'vault' ? (
            <TokenDetails
              tokens={[
                {
                  name: 'USDC',
                  amount: '2332 USDC',
                  usdValue: '$2332.12',
                  iconSrc: '/assets/icons/tokens/usdc.png',
                },
              ]}
              type="Borrowed"
            />
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

export default PositionItem;
