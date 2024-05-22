"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { tokenNameToImage } from "@/constants/tokenInfo";
import { TokenAPYInfo } from "@/types/dataTable";
import { DummyData } from "@/data/DummyData";
import { protocolNameToImage } from "@/constants/prorocolInfo";
import { CHAIN_CONFIG } from "@/constants/chainInfo";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const columns: ColumnDef<TokenAPYInfo>[] = [
  {
    accessorKey: "asset",
    header: "Asset",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={tokenNameToImage(row.getValue("asset"))}
          height={25}
          width={25}
          alt="weth"
        />
        <p>{row.getValue("asset")}</p>
      </div>
    ),
  },
  {
    accessorKey: "baseAPY",
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Base APY
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("baseAPY")}</div>
    ),
  },
  {
    accessorKey: "boostedAPY",
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Boosted APY
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("boostedAPY")}</div>
    ),
  },
  {
    accessorKey: "totalAPY",
    header: ({ column }) => {
      return (
        <div
          className="flex gap-1 items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total APY
          <CaretSortIcon className="ml-2 h-4 w-4 cursor-pointer" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("totalAPY")}</div>
    ),
  },
  {
    accessorKey: "chains",
    header: "Chains",
    cell: ({ row }) => (
      <div className="flex -space-x-1">
        {row.original.chains.map((chain, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="hover:scale-110"
                  key={index}
                  src={CHAIN_CONFIG[chain].chainImageUrl}
                  height={25}
                  width={25}
                  alt={CHAIN_CONFIG[chain].chainName}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">
                  {CHAIN_CONFIG[chain].chainName}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "protocols",
    header: "Protocols",
    cell: ({ row }) => (
      <div className="flex -space-x-1">
        {row.original.protocols.map((protocol, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  className="hover:scale-110"
                  src={protocolNameToImage(protocol)}
                  height={25}
                  width={25}
                  alt={protocol}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="bg-[#1e1e1e] text-white">{protocol}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "view",
    header: "",
    cell: ({ row }) => (
      <Button className="w-full bg-white text-black">View</Button>
    ),
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: DummyData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex w-full gap-8">
          <Tabs defaultValue="lendBorrow" className="w-[300px] dark">
            <TabsList className="grid w-full grid-cols-2 bg-black">
              <TabsTrigger value="lendBorrow">Lend & Borrow</TabsTrigger>
              <TabsTrigger value="vault">Yield vaults</TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            placeholder="Search token by name"
            value={(table.getColumn("asset")?.getFilterValue() as string) ?? ""}
            onChange={(event: any) =>
              table.getColumn("asset")?.setFilterValue(event.target.value)
            }
            className="max-w-md  py-4  bg-[#27272A] border-none text-white placeholder:text-[#84848A]"
          />
        </div>

        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto border-none bg-[#27272A]">
                Chains{" "}
                <ChevronDownIcon className="ml-2 h-4 w-4 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto border-none bg-[#27272A]">
                Protocols{" "}
                <ChevronDownIcon className="ml-2 h-4 w-4 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-b border-[#1e1e1e] "
                key={headerGroup.id}>
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
          <TableBody className="border-none">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-none cursor-pointer hover:bg-[#131313]"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-4 font-light" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
