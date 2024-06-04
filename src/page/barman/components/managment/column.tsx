import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown, Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/Dialog";
import OrdersAtendeedDetails from "../OrdersAtendeedDetails";
import { format } from "date-fns";

export const columns: ColumnDef<Header>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numero de pedido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-16">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "created_at",
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
      const date = format(row.getValue("created_at"), "yyyy-MM-dd")
      return <div>{date}</div>; 
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
    cell: ({ row }) => <div>{row.getValue("mozo")}</div>,
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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue('')}</div>  
    }
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
    cell: ({row}) => {
      return (
        <Dialog>
          <DialogTrigger>
            <Button className="border-none" variant={"outline"}>
              <Eye />
            </Button>
          </DialogTrigger> 
          {/* <OrdersAtendeedDetails data={row.original.orders}/> */}
        </Dialog>
      );
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
      const isActive =
      Boolean(row.getValue("state")) === true ? "No atendido" : "Atendido";
      return <div className={`rounded-full w-5 h-5`}>{isActive}</div>;
    },
  },
];
