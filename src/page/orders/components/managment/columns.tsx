import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown, Eye } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import { EyesDetailDialog } from "@/components";
import OrdersOfUserAction from "../OrdersOfUserAction";
import { useState } from "react";
import { AlertDialog } from "@/components/ui/AlertDialog";

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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">PD-{row.getValue("id")}</div>;
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
    cell: ({ row }) => {
      return <div className="ml-1">{row.getValue("mozo")}</div>;
    },
  },
  {
    accessorKey: "hostess",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Anfitriona
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="ml-5">{row.getValue("hostess")}</div>;
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = format(row.getValue("created_at"), "yyyy-MM-dd");
      return <div className="ml-7">{date}</div>;
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ver
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="p-2" variant={"outline"}>
              <Eye />
            </Button>
          </DialogTrigger>
          <EyesDetailDialog data={row.original}/>
        </Dialog>
      );
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = Boolean(row.getValue("state")) === true ? "No atendido" : "Atendido";
      return <div>{isActive}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const header = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false);
      return (
        <AlertDialog open={open} onOpenChange={setIsOpen}>
          <OrdersOfUserAction setIsOpen={setIsOpen} header={header} />
        </AlertDialog>
      );
    },
  }
];
