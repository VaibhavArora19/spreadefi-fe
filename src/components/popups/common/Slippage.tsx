import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

type SlippageProps = {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
};

const Slippage: React.FC<SlippageProps> = ({ setTab, tab }) => {
  return (
    <div className="bg-[#111111] absolute top-14 -right-40 rounded-xl border-[1px] border-[#525252] p-3 w-[225px]">
      <p className="text-xs mb-2">Slippage</p>

      <Tabs
        onValueChange={setTab}
        value={tab}
        className="w-[200px] text-xs dark">
        <TabsList className="grid w-full grid-cols-2 bg-black">
          <TabsTrigger value="auto">Auto</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === 'custom' && (
        <Input
          type="number"
          placeholder="0.0%"
          className="w-[200px] mt-2 border-[1px] border-[#525252] "
        />
      )}
    </div>
  );
};

export default Slippage;
