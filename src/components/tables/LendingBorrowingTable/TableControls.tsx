import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableItem } from "@/types/dataTable";
import { Table } from "@tanstack/react-table";

type TableControlsProps = {
  tab: string;
  setTab: (tab: string) => void;
  table: Table<TableItem>;
};

const TableControls: React.FC<TableControlsProps> = ({
  tab,
  setTab,
  table,
}) => {
  return (
    <div className="flex w-full gap-8">
      <Tabs onValueChange={setTab} value={tab} className="w-[300px] dark">
        <TabsList className="grid w-full grid-cols-2 bg-black">
          <TabsTrigger value="lendBorrow">Lend & Borrow</TabsTrigger>
          <TabsTrigger value="vault">Yield vaults</TabsTrigger>
        </TabsList>
      </Tabs>
      <Input
        placeholder="Search token by name"
        value={(table.getColumn("asset")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("asset")?.setFilterValue(event.target.value)
        }
        className="max-w-md py-4 bg-[#27272A] border-none text-white placeholder:text-[#84848A]"
      />
    </div>
  );
};

export default TableControls;
