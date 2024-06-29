import React from 'react';

const TransactionOverview = () => {
  return (
    <>
      <p className="text-xs text-[#707070] mb-1 ml-1 mt-4">
        Transaction Overview
      </p>
      <div className="bg-[#1E1E1E] rounded-xl space-y-3  p-4">
        <div className="flex  items-center justify-between text-gray-300">
          <p>Borrow health factor</p>
          <p className="text-green-600">21.3</p>
        </div>

        <div className="flex  items-center justify-between text-gray-300">
          <p>Platform Fee</p>
          <p>0.002 ETH</p>
        </div>

        <div className="flex  items-center justify-between text-gray-300">
          <p>Network Fee</p>
          <p>0.001</p>
        </div>
      </div>
    </>
  );
};

export default TransactionOverview;
