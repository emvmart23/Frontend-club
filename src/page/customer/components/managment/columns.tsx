import { Sheet, SheetTrigger } from "@/components/ui/Sheet";
import { ColumnDef } from "@tanstack/react-table";
import CustomerDetails from "../CustomerDetails";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "dni",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dni
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("dni")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false);
      return (
        <Sheet open={open} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Ver</Button>
          </SheetTrigger>
          <CustomerDetails customer={customer} setIsOpen={setIsOpen} />
        </Sheet>
      );
    },
  },
];
