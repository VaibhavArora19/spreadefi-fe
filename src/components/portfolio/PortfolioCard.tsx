import DividedBar from '../(ui)/DividerBar';
import { PortfolioDetail } from './PortfolioDetail';

const PortfolioCard = () => (
  <div className="w-full bg-[#111111] rounded-lg overflow-hidden">
    <div className="bg-[#1e1e1e] p-6 ">Portfolio Value</div>

    <div className="flex gap-20 p-6 items-end">
      <PortfolioDetail
        label="Net worth"
        value={71231.32}
        className="text-white text-4xl"
      />
      <PortfolioDetail
        label="Wallet"
        value={12121.45}
        className="text-green-800 text-xl"
      />
      <PortfolioDetail
        label="Lend"
        value={34872.19}
        className="text-green-600 text-xl"
      />
      <PortfolioDetail
        label="Vaults"
        value={18189.83}
        className="text-yellow-500 text-xl"
      />
      <PortfolioDetail
        label="Borrowed"
        value={8342.87}
        className="text-red-500 text-xl"
      />
    </div>

    <div className="px-6 pb-6 pt-2 ">
      <DividedBar borrowed={8200} vault={18000} wallet={12121} lend={34000} />
    </div>
  </div>
);

export default PortfolioCard;
