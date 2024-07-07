import Modal from '@/components/(ui)/Modal';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosWallet } from 'react-icons/io';
import { Tooltip } from '@mui/material';
import MigrateActionsLendingTable from './MigrateActionsLendingTable';
import MigrateActionsVaultTable from './MigrateActionsVaultTable';

const MigrateActionsModal = ({ onClose }: { onClose: () => void }) => {
  const [showLendingTable, setShowLendingTable] = useState(false);
  const [showVaultTable, setShowVaultTable] = useState(false);

  return (
    <>
      <Modal onClose={onClose} className="w-[580px] p-8 bg-[#0f0f0f]">
        <div className="flex justify-between items-center">
          <p className="text-xl font-medium">Select Action</p>
          <IoClose onClick={onClose} size={20} className="cursor-pointer" />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div
            onClick={() => {
              setShowVaultTable(true);
            }}
            className="bg-[#1e1e1e] rounded-lg hover:border-[0.5px] hover:border-[#707070] space-y-4 p-4 cursor-pointer flex-[0.5] ">
            <IoIosWallet size={30} className="text-[#707070]" />
            <p className="text-white text-sm">
              Movement to another yield position
            </p>
          </div>

          <div
            onClick={() => {
              setShowLendingTable(true);
            }}
            className="bg-[#1e1e1e] rounded-lg hover:border-[0.5px] hover:border-[#707070] space-y-4 p-4 cursor-pointer flex-[0.5] ">
            <IoIosWallet size={30} className="text-[#707070]" />
            <p className="text-white text-sm">
              Movement to another lending position
            </p>
          </div>
        </div>
      </Modal>

      {showLendingTable ? (
        <MigrateActionsLendingTable
          type="migrate"
          onClose={() => {
            setShowLendingTable(false);
          }}
        />
      ) : null}

      {showVaultTable ? (
        <MigrateActionsVaultTable
          type="migrate"
          onClose={() => {
            setShowVaultTable(false);
          }}
        />
      ) : (
        false
      )}
    </>
  );
};

export default MigrateActionsModal;
