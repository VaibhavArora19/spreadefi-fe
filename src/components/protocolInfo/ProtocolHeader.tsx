import React from 'react';
import Image from 'next/image';
import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { capitalize } from '@/helpers';

type ProtocolHeaderType = {
  protocol: string;
  chain: string;
};

const ProtocolHeader: React.FC<ProtocolHeaderType> = ({
  protocol,
  chain,
}: ProtocolHeaderType) => {
  return (
    <div className="flex gap-3 items-center">
      <Image
        src={CHAIN_CONFIG[chain].chainImageUrl}
        height={35}
        width={35}
        alt={chain}
      />
      <p className="text-2xl font-semibold">{capitalize(protocol)}</p>
    </div>
  );
};

export default ProtocolHeader;
