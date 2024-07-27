import Modal from '@/components/(ui)/Modal';
import React from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

interface FeeRowProps {
  label: string;
  amount: string;
  usd: string;
}

const FeeRow: React.FC<FeeRowProps> = ({ label, amount, usd }) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <p>{label}</p>
      <p>
        {amount} ETH <span className="text-[#707070]">(${usd})</span>
      </p>
    </div>
  );
};

const TransactionDetailsModal = ({ onClose }: { onClose: () => void }) => {
  interface Fee {
    label: string;
    amount: string;
    usd: string;
  }

  const fees: Fee[] = [
    { label: 'Cross-chain gas fees', amount: '0.001', usd: '3.23' },
    { label: 'Gas fee on destination chain', amount: '0.001', usd: '3.23' },
    { label: 'Boost fee', amount: '0.001', usd: '3.23' },
    { label: 'Expected gas refund', amount: '0.001', usd: '3.23' },
    { label: 'Total', amount: '500', usd: '766.34' },
  ];

  return (
    <Modal isBackdrop={false} className="w-[500px] p-5 h-[500px]">
      <div className="flex justify-between items-center pb-4 mb-4 border-b-[0.5px] border-b-[#2a2a2a]">
        <p className="text-center w-full">Fee details</p>
        <MdKeyboardArrowUp onClick={onClose} className="cursor-pointer text-xl" />
      </div>

      <p className="text-sm text-[#707070] ">
        Boost (GMP Express) is a special feature of Axelar that reduces transaction time across
        chains to 5-30 seconds. It is currently available for swaps below a value of $20,000 USD.
      </p>

      <p className=" font-medium mb-3 mt-6 ">Fee breakdown</p>

      <div className="flex flex-col gap-1 pb-4 border-b-[0.5px] border-b-[#2a2a2a]">
        {fees.map((fee, index) => (
          <FeeRow key={index} label={fee.label} amount={fee.amount} usd={fee.usd} />
        ))}
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Information</p>
        <p className="text-sm text-[#707070] ">
          If market prices fluctuate significantly, the transaction may revert and you will receive
          axlUSDC on the destination chain
        </p>
      </div>
    </Modal>
  );
};

export default TransactionDetailsModal;
