import React, { useState } from 'react';
import Modal from '@/components/(ui)/Modal';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IoMdSettings } from 'react-icons/io';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { Switch } from '@/components/ui/switch';
import MigrateTransactionOverview from './MigrateTransactionOverview';
import Slippage from './Slippage';

const MigrateBorrow = ({
  onClose,
  type,
}: {
  onClose: () => void;
  type: 'borrowAction' | 'migrate';
}) => {
  useLockBodyScroll(true);

  const [showSettings, setShowSettings] = useState(false);
  const [tab, setTab] = useState('auto');

  return (
    <Modal className="w-[500px] p-5 ">
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium text-lg capitalize">
          {type === 'borrowAction' ? 'Borrow & Supply' : 'Migrate'} Assets
        </p>

        <div className="flex items-center gap-1 relative">
          <IoMdSettings
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings(!showSettings);
            }}
            className="cursor-pointer text-lg"
          />
          <IoClose onClick={onClose} className="cursor-pointer text-lg" />
        </div>
      </div>

      <p className="text-xs text-[#707070] mb-1 ml-1">Amount</p>
      <div className="bg-[#1E1E1E] rounded-xl  flex items-start overflow-hidden justify-between">
        <input
          type="number"
          placeholder="0.0"
          className="text-3xl  text-white bg-inherit border-none outline-none placeholder:text-gray-500 p-4 w-[250px] overflow-hidden"
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
        <div className="flex items-center gap-4 text-xs p-4">
          <div className="flex items-center gap-2 py-3 px-4 rounded-md bg-[#111]">
            <Image src={'/assets/icons/tokens/cbeth.png'} height={20} width={20} alt="cbeth" />

            {/**
             *  token to be migrated - get it from table
             *  */}
            <p className="text-sm">cbETH</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
          25%
        </p>
        <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
          50%
        </p>
        <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
          75%
        </p>
        <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
          100%
        </p>
      </div>

      <MigrateTransactionOverview type={type} />

      <div className="bg-[#1E1E1E] w-full mt-3 rounded-xl p-4 flex items-center justify-between">
        <p className="text-sm">Arrival on gas</p>
        <Switch />
      </div>

      <Button
        type="button"
        onClick={() => {}}
        className="w-full text-black bg-white mt-4 py-6 capitalize">
        {type === 'migrate' ? 'Migrate' : 'Borrow & Supply'}
      </Button>

      {showSettings && <Slippage setTab={setTab} tab={tab} />}
    </Modal>
  );
};

export default MigrateBorrow;
