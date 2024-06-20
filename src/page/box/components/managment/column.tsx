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
    accessorKey: "note_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numero de venta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const format = row.getValue("note_id") == null || row.getValue("note_id") == undefined ?  "-" : "PD-" + row.getValue("note_id")
      return <div className="text-center">{format}</div>
    }
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isAnulated = Boolean(row.getValue("state_doc")) === true ? "Normal" : "Finalizado";
      return <div className="text-center">{isAnulated}</div>;
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const format = row.getValue("note_sale") == null || row.getValue("note_id") == undefined ?  "-" : "NV1-" + row.getValue("note_sale")
      return <div className="text-center">{format}</div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = useState(false);
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Acciones</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[20rem] h-[16rem]">
            <DialogHeader className="mb-2">
              <DialogTitle>Acciones</DialogTitle>
            </DialogHeader>
            <NoteSaleActions setIsOpen={setIsOpen} header={row.original} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];
