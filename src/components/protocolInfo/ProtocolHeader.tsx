import React from 'react';
import Image from 'next/image';

const ProtocolHeader: React.FC = () => {
  return (
    <div className="flex gap-3 items-center">
      <Image
        src={'/assets/icons/chains/op.png'}
        height={35}
        width={35}
        alt="Optimism"
      />
      <p className="text-2xl font-semibold">Compound Finance</p>
    </div>
  );
};

export default ProtocolHeader;
