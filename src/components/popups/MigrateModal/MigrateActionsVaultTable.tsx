import Modal from '@/components/(ui)/Modal';
import AssetTable from '@/components/tables/AssetTable/AssetTable';
import { MigrateVaultData } from '@/data/DummyData';
import React from 'react';
import { IoClose } from 'react-icons/io5';

const MigrateActionsVaultTable = ({
  onClose,
  type,
}: {
  onClose: () => void;
  type: 'migrate' | 'borrowAndAction' | 'supply';
}) => {
  return (
    <Modal
      onClose={onClose}
      className="bg-[#0f0f0f] p-6 w-[80%] h-[80vh] overflow-scroll">
      <div className="flex justify-between items-center mb-4 pb-4 border-b-[0.5px] border-b-[#707070]">
        <p className="text-sm font-semibold">
          Migrate your position in any of the yield vaults below
        </p>
        <IoClose size={20} onClick={onClose} className="cursor-pointer" />
      </div>

      <AssetTable type={type} assetData={MigrateVaultData} />
    </Modal>
  );
};

export default MigrateActionsVaultTable;
