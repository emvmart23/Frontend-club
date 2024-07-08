import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ReportHostess>[] = [
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
    cell: ({ row }) => {
      const format = row.getValue("hostess_role") === 4 ? "Anfitriona" : "Bailarina";
      return <div>{format}</div>;
    },
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sueldo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>S/. {row.getValue("salary")}</div>,
  },
  {
    accessorKey: "profit_margin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % Comisión
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-7">{row.getValue("profit_margin")}%</div>,
  },
  {
    accessorKey: "currentSale",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Venta del dia
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-7">S/. {row.getValue("currentSale")}</div>,
  },
  {
    accessorKey: "comission",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comision
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-3">{row.getValue("comission")}</div>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("total")}</div>,
  },
];
