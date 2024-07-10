import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import BoxDetails from "../OpeningBoxDetails";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";

export const columns: ColumnDef<Box>[] = [
  {
    accessorKey: "user_opening",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aperturador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-4">{row.getValue("user_opening")}</div>
    ),
  },
  {
    accessorKey: "user_closing",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cerrador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isNull =
        row.getValue("user_closing") === null
          ? "-"
          : (row.getValue("user_closing") as string);
      return <div className="ml-3 w-min">{isNull}</div>;
    },
  },
  {
    accessorKey: "opening",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apertura
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("opening")}</div>,
  },
  {
    accessorKey: "closing",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cierre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isNull =
        row.getValue("closing") === null
          ? "-"
          : (row.getValue("closing") as string);
      return <div>{isNull}</div>;
    },
  },
  {
    accessorKey: "initial_balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Saldo Inicial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-5">{row.getValue("initial_balance")}</div>
    ),
  },
  {
    accessorKey: "final_balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Saldo Final
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-5">{row.getValue("final_balance")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive =
        Boolean(row.getValue("state")) === true ? "bg-green-500" : "bg-red-500";
      return <div className={`${isActive} rounded-full w-5 h-5 ml-4`} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const box = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false);
      return (
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Ver</Button>
          </DialogTrigger>
          <BoxDetails box={box} open={open} setIsOpen={setIsOpen} />
        </Dialog>
      );
    },
  },
];
