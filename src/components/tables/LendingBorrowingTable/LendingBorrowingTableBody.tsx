import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { flexRender, Table } from '@tanstack/react-table';
import React from 'react';
import LendingBorrowingColumn from './LendingBorrowingColumn';
import { TableItem } from '@/types/dataTable';

type TLendingBorrowingBodyProps = {
  table: Table<TableItem>;
};

const LendingBorrowingTableBody: React.FC<TLendingBorrowingBodyProps> = ({
  table,
}) => {
  return (
    <TableBody className="border-none">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            className="border-none cursor-pointer hover:bg-[#131313]"
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                className="py-4 max-w-[150px] font-light"
                key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={LendingBorrowingColumn.length}
            className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default LendingBorrowingTableBody;
