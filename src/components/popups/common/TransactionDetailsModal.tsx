import Modal from '@/components/(ui)/Modal';
import { useTransactionStore } from '@/redux/hooks';
import { SquidRoute, TTransactionResponse } from '@/types/transaction';
import { ethers } from 'ethers';
import { isBytesLike } from 'ethers/lib/utils';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

interface FeeRowProps {
  label: string;
  amount: string;
  usd: string;
}

interface Fee {
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

const TransactionDetailsModal = ({
  onClose,
  squidTx,
}: {
  onClose: () => void;
  squidTx: TTransactionResponse[number];
}) => {
  const [fees, setFees] = useState<Fee[] | null>([
    { label: 'Gas-receiver fees', amount: '0.0', usd: '0.0' },
    { label: 'Boost fee', amount: '0.0', usd: '0.0' },
    { label: 'Gas fee', amount: '0.0', usd: '0.0' },
    { label: 'Total', amount: '0.0', usd: '0.0' },
  ]);

  useEffect(() => {
    if (!squidTx || isBytesLike(squidTx.tx)) {
      return;
    }

    const gasReceiverFee = {
      amount: (squidTx.tx as SquidRoute).estimate.feeCosts[0]
        ? ethers.utils
            .formatUnits((squidTx.tx as SquidRoute).estimate.feeCosts[0].amount, 18)
            .substring(0, 8)
        : '0',
      amountUsd: (squidTx.tx as SquidRoute).estimate.feeCosts[0]
        ? (squidTx.tx as SquidRoute).estimate.feeCosts[0].amountUsd
        : '0',
    };

    const boostFee = {
      amount: (squidTx.tx as SquidRoute).estimate.feeCosts[1]
        ? ethers.utils
            .formatUnits((squidTx.tx as SquidRoute).estimate.feeCosts[1].amount, 18)
            .substring(0, 8)
        : '0',
      amountUsd: (squidTx.tx as SquidRoute).estimate.feeCosts[0]
        ? (squidTx.tx as SquidRoute).estimate.feeCosts[1].amountUsd
        : '0',
    };

    const gasFee = {
      amount: (squidTx.tx as SquidRoute).estimate.gasCosts[0]
        ? ethers.utils
            .formatUnits((squidTx.tx as SquidRoute).estimate.gasCosts[0].amount, 18)
            .substring(0, 8)
        : '0',
      amountUsd: (squidTx.tx as SquidRoute).estimate.gasCosts[0]
        ? (squidTx.tx as SquidRoute).estimate.gasCosts[0].amountUsd
        : '0',
    };

    setFees([
      {
        label: 'Gas-receiver fees',
        amount: gasReceiverFee.amount,
        usd: gasReceiverFee.amountUsd,
      },
      {
        label: 'Boost fee',
        amount: boostFee.amount,
        usd: boostFee.amountUsd,
      },
      {
        label: 'Gas fee',
        amount: gasFee.amount,
        usd: gasFee.amountUsd,
      },
      {
        label: 'Total',
        amount: (Number(gasReceiverFee.amount) + Number(boostFee.amount) + Number(gasFee.amount))
          .toString()
          .substring(0, 8),
        usd: (
          Number(gasReceiverFee.amountUsd) +
          Number(boostFee.amountUsd) +
          Number(gasFee.amountUsd)
        ).toString(),
      },
    ]);
  }, [squidTx]);

  return (
    <Modal isBackdrop={false} className="w-[500px] p-5 h-[550px]">
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
        {fees &&
          fees.map((fee, index) => (
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
