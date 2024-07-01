import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import NoteSaleActions from "../NoteSaleActions";

export const columns: ColumnDef<Header>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numero de pedido
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">PD-{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de emision
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = format(row.getValue("created_at"), "yyyy-MM-dd");
      return <div className="text-center">{date}</div>;
    },
  },
  {
    accessorKey: "state_doc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado de documento
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("state_doc") as number;
      const isAnulated =
        value !== null
          ? Boolean(value) === true
            ? "En proceso"
            : "Finalizado"
          : "Anulado";
      return <div className="text-center">{isAnulated}</div>;
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          className="hidden"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        ></Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center hidden">{row.getValue("state")}</div>;
    },
  },
  {
    accessorKey: "mozo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mozo
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("total_price")}</div>,
  },
  {
    accessorKey: "note_sale",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nota de venta
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const format =
        row.getValue("note_sale") == null ||
        row.getValue("note_id") == undefined
          ? "-"
          : "NV1-" + row.getValue("note_sale");
      return <div className="text-center">{format}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      const header = row.original
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Acciones</Button>
          </DialogTrigger>
          <DialogContent className={`max-w-[20rem] ${header.state_doc !== null && "h-[16rem]"}`}>
            <DialogHeader className="mb-2">
              <DialogTitle>Acciones</DialogTitle>
            </DialogHeader>
            <NoteSaleActions setIsOpen={setIsOpen} header={header} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
