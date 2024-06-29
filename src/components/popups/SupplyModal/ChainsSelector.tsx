import React from 'react';

const ChainsSelector = () => {
  return (
    <select
      className="bg-[#151515] border-none outline-none p-2 rounded-md text-xs"
      name="chains"
      id="chains">
      <option selected disabled>
        Select chain
      </option>
      <option value="Base">Base</option>
      <option value="Optimism">Optimism</option>
      <option value="Arbitrum">Arbitrum</option>
    </select>
  );
};

export default ChainsSelector;
