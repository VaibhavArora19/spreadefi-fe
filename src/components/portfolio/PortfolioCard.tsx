import DividedBar from '../(ui)/DividerBar';
import { PortfolioDetail } from './PortfolioDetail';
import { formatUnits } from 'viem';

type PortfolioCardProps = {
  portfolio: {
    totalCollateralBase: any;
    totalDebtBase: any;
    totalYieldBalance: any;
    totalBalanceUSD: any;
  };
};
const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  return (
    <div className="w-full bg-[#111111] rounded-lg overflow-hidden">
      <div className="bg-[#1e1e1e] p-6 ">Portfolio Value</div>

      <div className="flex gap-20 p-6 items-end">
        <PortfolioDetail
          label="Net worth"
          value={
            portfolio
              ? parseFloat(formatUnits(portfolio?.totalCollateralBase || 0, 8)) +
                portfolio?.totalYieldBalance -
                parseFloat(formatUnits(portfolio?.totalDebtBase || 0, 8))
              : 0
          }
          className="text-white text-4xl"
        />
        <PortfolioDetail
          label="Wallet"
          value={parseFloat(formatUnits(portfolio?.totalBalanceUSD || 0, 8))}
          className="text-green-800 text-xl"
        />
        <PortfolioDetail
          label="Lend"
          value={parseFloat(formatUnits(portfolio?.totalCollateralBase || 0, 8))}
          className="text-green-600 text-xl"
        />
        <PortfolioDetail
          label="Vaults"
          value={portfolio?.totalYieldBalance}
          className="text-yellow-500 text-xl"
        />
        <PortfolioDetail
          label="Borrowed"
          value={parseFloat(formatUnits(portfolio?.totalDebtBase || 0, 8))}
          className="text-red-500 text-xl"
        />
      </div>

      <div className="px-6 pb-6 pt-2 ">
        <DividedBar
          borrowed={parseFloat(formatUnits(portfolio?.totalDebtBase || 0, 8))}
          vault={portfolio?.totalYieldBalance}
          wallet={parseFloat(formatUnits(portfolio?.totalBalanceUSD || 0, 8))}
          lend={parseFloat(formatUnits(portfolio?.totalCollateralBase || 0, 8))}
        />
      </div>
    </div>
  );
};
export default PortfolioCard;
