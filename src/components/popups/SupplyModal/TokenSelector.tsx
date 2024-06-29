import React from 'react';

const TokenSelector = () => {
  return (
    <select
      className="bg-[#151515] border-none outline-none p-2 rounded-md"
      name="token"
      id="token">
      <option selected disabled>
        Select token
      </option>
      <option value="volvo">ETH</option>
      <option value="saab">USDC</option>
      <option value="mercedes">USDT</option>
      <option value="audi">DAI</option>
    </select>
  );
};

export default TokenSelector;
