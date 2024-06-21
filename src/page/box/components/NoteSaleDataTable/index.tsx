import * as React from "react";
import {
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
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import { columns } from "../managment/column";
import { Combobox } from "@/components/ui/Combobox";
import { Input } from "@/components/ui/Input";
import { getUsers } from "@/helpers/users/getUsers";
import { formatUsers } from "@/helpers/users/formatUsers";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

interface Props {
  data: Header[];
  isLoading: boolean;
}

export default function NoteSaleDataTable({ data, isLoading }: Props) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
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

  // const boxState = [
  //   {
  //     value: "1",
  //     label: "Normal",
  //   },
  //   {
  //     value: "0",
  //     label: "Anulado",
  //   },
  // ];

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full md:w-[93%] lg:w-full">
      <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
        <div className="flex flex-col md:flex-row md:space-y-0 gap-2 md:w-[75%] lg:w-[65%]">
          <Select
            onValueChange={(value) => {
              if (value === "1")
                table.getColumn("state_doc")?.setFilterValue("1");
              if (value === "0")
                table.getColumn("state_doc")?.setFilterValue("00");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por estado..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Normal</SelectItem>
                <SelectItem value="0">Finalizado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Combobox
            heading={"Mozos"}
            selectItemMsg="Filtrar mozo"
            data={formatUsers(users, 7)}
            onSelect={(value) => table.getColumn("mozo")?.setFilterValue(value)}
            tabelValue={
              (table.getColumn("mozo")?.getFilterValue() as string) ?? ""
            }
            onChange={(value) => table.getColumn("mozo")?.setFilterValue(value)}
          />
          <Input
            type="date"
            placeholder="Filtrar por fecha..."
            value={
              (table.getColumn("created_at")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("created_at")?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full max-w-[7.5rem]">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <Skeleton className="w-full h-[25rem]" />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="pl-0">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No hay resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Atras
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
