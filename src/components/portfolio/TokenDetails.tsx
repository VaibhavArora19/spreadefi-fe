import Image from 'next/image';

interface TokenDetailsProps {
  tokens: {
    name: string;
    amount: string;
    usdValue: string;
    iconSrc: string;
  }[];
  type: 'Supplied' | 'Borrowed';
}

export const TokenDetails: React.FC<TokenDetailsProps> = ({ tokens, type }) => (
  <div className="bg-[#464646] rounded-lg overflow-hidden">
    <div className="flex p-3 bg-[#2c2c2c] text-sm text-[#707070]">
      <p className="flex-[0.25]">{type}</p>
      <p className="flex-[0.33] text-center">Amount</p>
      <p className="flex-[0.33] text-center">USD Value</p>
    </div>
    {tokens.map((token, index) => (
      <div key={index} className="flex p-3 bg-[#404040] m-1 rounded-md">
        <div className="flex items-center flex-[0.25] gap-2">
          <Image src={token.iconSrc} height={30} width={30} alt="Token Icon" />
          <p>{token.name}</p>
        </div>
        <p className="flex-[0.33] text-center">{token.amount}</p>
        <p className="flex-[0.33] text-center">{token.usdValue}</p>
      </div>
    ))}
  </div>
);
