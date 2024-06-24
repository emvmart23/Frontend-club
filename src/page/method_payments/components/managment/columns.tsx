import { Button } from "@/components/ui/Button";
import { Sheet, SheetTrigger } from "@/components/ui/Sheet";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import MethodsDetails from "../MethodDetails";

export const columns: ColumnDef<MethodPayment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false);
      return (
        <Sheet open={open} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Ver</Button>
          </SheetTrigger>
          <MethodsDetails data={data} setIsOpen={setIsOpen} />
        </Sheet>
      );
    },
  },
];
