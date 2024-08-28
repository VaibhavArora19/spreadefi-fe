import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const DividedBar = ({
  wallet,
  lend,
  vault,
  borrowed,
}: {
  wallet: number;
  lend: number;
  vault: number;
  borrowed: number;
}) => {
  const total = wallet + lend + vault + borrowed;

  return (
    <div className="w-full bg-gray-200 h-2 rounded overflow-hidden flex">
      <Tooltip title={`Wallet - $${wallet.toLocaleString('en')} `}>
        <div
          style={{ width: `${(wallet / total) * 100}%` }}
          className="bg-green-800 h-full cursor-pointer"></div>
      </Tooltip>

      <Tooltip title={`Lend - $${lend.toLocaleString('en')} `}>
        <div
          style={{ width: `${(lend / total) * 100}%` }}
          className="bg-green-500 h-full cursor-pointer"></div>
      </Tooltip>

      <Tooltip title={`Vault - $${vault?.toLocaleString('en')} `}>
        <div
          style={{ width: `${(vault / total) * 100}%` }}
          className="bg-yellow-500 h-full cursor-pointer"></div>
      </Tooltip>
      <Tooltip title={`Borrowed - $${borrowed.toLocaleString('en')} `}>
        <div
          style={{ width: `${(borrowed / total) * 100}%` }}
          className="bg-red-500 h-full cursor-pointer"></div>
      </Tooltip>
    </div>
  );
};

export default DividedBar;
