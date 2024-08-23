import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { transactionPayloadActions } from '@/redux/actions';
import { useTransactionPayloadStore } from '@/redux/hooks';
import React from 'react';
import { useDispatch } from 'react-redux';

type SlippageProps = {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
};

const Slippage: React.FC<SlippageProps> = ({ setTab, tab }) => {
  const { slippage } = useTransactionPayloadStore();
  const dispatch = useDispatch();

  return (
    <div className="bg-[#111111] absolute top-14 -right-40 rounded-xl border-[1px] border-[#525252] p-3 w-[225px]">
      <p className="text-xs mb-2">Slippage</p>

      <Tabs onValueChange={setTab} value={tab} className="w-[200px] text-xs dark">
        <TabsList className="grid w-full grid-cols-2 bg-black">
          <TabsTrigger value="auto">Auto</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === 'custom' && (
        <div className="flex items-center gap-2 mt-2 ">
          <p
            className="p-2 bg-[#27272A] rounded-md flex-[0.33] text-center cursor-pointer hover:bg-[#1e1e1e]"
            onClick={() => dispatch(transactionPayloadActions.setSlippage(0.5))}>
            0.5%
          </p>
          <p
            className="p-2 bg-[#27272A] rounded-md  flex-[0.33] text-center cursor-pointer hover:bg-[#1e1e1e]"
            onClick={() => dispatch(transactionPayloadActions.setSlippage(1.5))}>
            1.5%
          </p>
          <p
            className="p-2 bg-[#27272A] rounded-md  flex-[0.33] text-center cursor-pointer hover:bg-[#1e1e1e]"
            onClick={() => dispatch(transactionPayloadActions.setSlippage(3))}>
            3%
          </p>
        </div>
      )}
    </div>
  );
};

export default Slippage;
