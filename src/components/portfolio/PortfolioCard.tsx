import DividedBar from '../(ui)/DividerBar';
import { PortfolioDetail } from './PortfolioDetail';
import { formatUnits } from 'viem';

type PortfolioCardProps = {
  portfolio: {
    totalCollateralBase: string | number;
    totalDebtBase: string;
    totalBalanceUSD: string;
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
            parseFloat(formatUnits(BigInt(portfolio?.totalCollateralBase), 6)) -
            parseFloat(formatUnits(BigInt(portfolio?.totalDebtBase), 6))
          }
          className="text-white text-4xl"
        />
        <PortfolioDetail
          label="Wallet"
          value={parseFloat(formatUnits(BigInt(portfolio?.totalBalanceUSD), 6))}
          className="text-green-800 text-xl"
        />
        <PortfolioDetail
          label="Lend"
          value={parseFloat(
            formatUnits(BigInt(portfolio?.totalCollateralBase), 6),
          )}
          className="text-green-600 text-xl"
        />
        <PortfolioDetail
          label="Vaults"
          value={18189.83}
          className="text-yellow-500 text-xl"
        />
        <PortfolioDetail
          label="Borrowed"
          value={parseFloat(formatUnits(BigInt(portfolio?.totalDebtBase), 6))}
          className="text-red-500 text-xl"
        />
      </div>

      <div className="px-6 pb-6 pt-2 ">
        <DividedBar
          borrowed={parseFloat(
            formatUnits(BigInt(portfolio?.totalDebtBase), 6),
          )}
          vault={18000}
          wallet={parseFloat(
            formatUnits(BigInt(portfolio?.totalBalanceUSD), 6),
          )}
          lend={parseFloat(
            formatUnits(BigInt(portfolio?.totalCollateralBase), 6),
          )}
        />
      </div>
    </div>
  );
};
export default PortfolioCard;
