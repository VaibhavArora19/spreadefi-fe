import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import op from '../../../../public/assets/icons/chains/op.png';
import Modal from '@/components/(ui)/Modal';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const closePercentage = ['25', '50', '75', '100'];

const IncreaseDecreaseModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Modal className="w-[500px] p-5 space-y-4">
      <div className="flex justify-between items-start pb-2 border-b-[0.5px] border-[#272727] mb-4">
        <div className="flex items-center gap-2">
          <div className="space-y-1">
            <div>wstETH</div>
            <div className="flex items-center gap-2">
              <Image className="w-4" src={op} alt="logo" />
              <div className="text-sm">Aave v3</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 relative">
          <IoClose onClick={onClose} className="cursor-pointer text-lg" />
        </div>
      </div>
      <div>
        <Tabs defaultValue="long" className="w-full dark">
          <TabsList className="w-full *:w-full">
            <TabsTrigger value="long">Open/Increase</TabsTrigger>
            <TabsTrigger value="short">Close/Decrease</TabsTrigger>
          </TabsList>
          <TabsContent value="long">
            <div className="space-y-4 py-2">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Order size"
                  className="text-lg text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 pt-2 pb-5 w-full overflow-hidden"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                />
                <span className="text-gray-400 absolute right-4 top-4">ETH</span>
                <span className="text-gray-400 text-xs absolute left-4 bottom-1">
                  Current value 0.005
                </span>
              </div>
              <div className="flex itcems-center justify-between">
                <div>Close %</div>
                <div className="flex gap-2">
                  {closePercentage.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 text-sm bg-[#27272A] rounded-full cursor-pointer">
                      {item}%
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full text-black bg-white py-2 capitalize flex-[0.15]">
                Open/Increase
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="short">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
};

export default IncreaseDecreaseModal;
