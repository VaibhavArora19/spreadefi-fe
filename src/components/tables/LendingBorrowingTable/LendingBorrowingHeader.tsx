import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableItem } from "@/types/dataTable";
import { flexRender, Table } from "@tanstack/react-table";
import React from "react";

type TLendingBorrowingHeaderProps = {
  table: Table<TableItem>;
};

const LendingBorrowingHeader: React.FC<TLendingBorrowingHeaderProps> = ({
  table,
}) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className="border-b border-[#1e1e1e] " key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                className={`font-light text-[#939393]`}
                key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default LendingBorrowingHeader;
