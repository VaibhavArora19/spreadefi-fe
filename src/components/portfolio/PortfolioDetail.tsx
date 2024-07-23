interface PortfolioDetailProps {
  label: string;
  value: number | string;
  className?: string;
}

export const PortfolioDetail: React.FC<PortfolioDetailProps> = ({ label, value, className }) => (
  <div>
    <p className="text-[#707070] font-light mb-1 text-sm">{label}</p>
    <p className={`${className} `}>${value.toLocaleString()}</p>
  </div>
);
