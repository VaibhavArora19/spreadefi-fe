import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableItem } from '@/types/dataTable';
import { Table } from '@tanstack/react-table';

type TableControlsProps = {
  table: Table<TableItem>;
};

const TableControls: React.FC<TableControlsProps> = ({ table }) => {
  return (
    <div className="flex w-full gap-8">
      {/* <Tabs onValueChange={setTab} value={tab} className="w-[300px] dark">
        <TabsList className="grid w-full grid-cols-2 bg-black">
          <TabsTrigger value="lendBorrow">Lend & Borrow</TabsTrigger>
          <TabsTrigger value="vault">Yield vaults</TabsTrigger>
        </TabsList>
      </Tabs> */}
      <Input
        placeholder="Search token by name"
        value={
          (table.getColumn('assetSymbol')?.getFilterValue() as string) ??
          (table.getColumn('primaryAsset')?.getFilterValue() as string)
        }
        onChange={(event) =>
          table.getColumn('asset')?.setFilterValue(event.target.value) ??
          table.getColumn('primaryAsset')?.setFilterValue(event.target.value)
        }
        className="w-[80%] py-4 bg-gray-300 border-none text-black placeholder:text-[#84848A]"
      />
    </div>
  );
};

export default TableControls;
