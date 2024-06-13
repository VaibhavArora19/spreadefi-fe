interface DetailSectionProps {
  label: string;
  value: string | number;
  className?: string;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  label,
  value,
  className,
}) => (
  <div className={`flex-[0.2] ${className}`}>
    <p className="text-[#707070] text-left mb-2 text-sm font-light">{label}</p>
    <p className="text-left">
      {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
    </p>
  </div>
);
