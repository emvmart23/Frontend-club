import * as React from "react";
import {
  ColumnFiltersState,
  OnChangeFn,
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
import { columns } from "../managment/columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Combobox } from "@/components/ui/Combobox";
import { formatUsers } from "@/helpers/users/formatUsers";
import { getUsers } from "@/helpers/users/getUsers";
import { Input } from "@/components/ui/Input";

interface Props {
  data: ReportHostess[];
  isLoading: boolean;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  columnFilters: ColumnFiltersState;
}

export default function ReportHostessDataTable({
  data,
  isLoading,
  columnFilters,
  setColumnFilters,
}: Props) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.user);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center py-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            defaultValue=" "
            onValueChange={(value) => {
              if (value === "4")
                table.getColumn("hostess_role")?.setFilterValue("04");
              if (value === "8")
                table.getColumn("hostess_role")?.setFilterValue("8");
              if (value === " ")
                table.getColumn("hostess_role")?.setFilterValue(" ");
            }}
          >
            <SelectTrigger className="md:w-28">
              <SelectValue placeholder="Filtrar por cargo..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value=" ">Todas</SelectItem>
                <SelectItem value="4">Anfitrionas</SelectItem>
                <SelectItem value="8">Bailarinas</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Combobox
            className="md:w-42"
            heading={"Trabajadoras"}
            selectItemMsg="Buscar trabajadora.."
            data={formatUsers(users, 4, 8)}
            onSelect={(value) =>
              table.getColumn("hostess")?.setFilterValue(value)
            }
            tabelValue={
              (table.getColumn("hostess")?.getFilterValue() as string) ?? ""
            }
            onChange={(value) =>
              table.getColumn("hostess")?.setFilterValue(value)
            }
          />
          <Input
            type="date"
            value={
              (table.getColumn("box_date")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("box_date")?.setFilterValue(event.target.value)
            }
            className="w-40"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-52 md:w-min md:ml-auto">
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
                      <TableHead key={header.id} className="p-1">
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
                      <TableCell className="pl-3" key={cell.id}>
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
