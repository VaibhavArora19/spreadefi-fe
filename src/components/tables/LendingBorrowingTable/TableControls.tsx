import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableItem } from '@/types/dataTable';
import { Table } from '@tanstack/react-table';

type TableControlsProps = {
  table: Table<TableItem>;
  type: 'lendBorrow' | 'vault' | 'looping';
};

const TableControls: React.FC<TableControlsProps> = ({ table, type }) => {
  return (
    <div className="flex w-full gap-8">
      <Input
        placeholder="Search token by name"
        value={
          type === 'lendBorrow'
            ? (table.getColumn('assetSymbol')?.getFilterValue() as string)
            : (table.getColumn('primaryAsset')?.getFilterValue() as string)

          // (table.getColumn('assetSymbol')?.getFilterValue() as string) ??
          // (table.getColumn('primaryAsset')?.getFilterValue() as string)
        }
        onChange={(event) =>
          type === 'lendBorrow'
            ? table.getColumn('assetSymbol')?.setFilterValue(event.target.value)
            : table
                .getColumn('primaryAsset')
                ?.setFilterValue(event.target.value)
        }
        className="w-[80%] py-4 bg-gray-300 border-none text-black placeholder:text-[#84848A]"
      />
    </div>
  );
};

export default TableControls;
