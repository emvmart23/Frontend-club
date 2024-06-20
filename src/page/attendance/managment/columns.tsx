import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Attendace>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("user")}</div>;
    }
  },
  {
    accessorKey: "date",
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
    cell: ({ row }) => {
      return <div>{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "box_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de Caja
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("box_date")}</div>;
    },
  },
  {
    accessorKey: "present",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asistio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive =
        Boolean(row.getValue("present")) === true
          ? "bg-green-500"
          : "bg-red-500";
      return <div className={`${isActive} rounded-full w-5 h-5`} />;
    },
  },
  {
    accessorKey: "box_state",
    header: ({ column }) => {
      return (
        <Button
          className="hidden"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          state
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("box_state") as number;
      return <div className="hidden">{isActive}</div>
    }
  },
  
];
