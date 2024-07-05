import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Detail>[] = [
  {
    accessorKey: "hostess",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("hostess")}</div>,
  },
  {
    accessorKey: "hostess_role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cargo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("hostess_role")}</div>,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("salary")}</div>,
  },
  {
    accessorKey: "profit_margin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("profit_margin")}</div>,
  },
  // {
  //   accessorKey: "",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="outline"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Venta del dia
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div>{row.getValue("profit_margin")}</div>,
  // },
  // {
  //   accessorKey: "",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="outline"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Comision
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div>{row.getValue("profit_margin")}</div>,
  // }
];
