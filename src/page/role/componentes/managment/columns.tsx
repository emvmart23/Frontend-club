import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/Sheet";
import { useState } from "react";
import RoleDetails from "../RoleDetails";

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: "role_name",
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
    cell: ({ row }) => <div>{row.getValue("role_name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false)
      return (
        <Sheet open={open} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Ver</Button>
          </SheetTrigger>
          <RoleDetails role={role} setIsOpen={setIsOpen}  />
        </Sheet>
      );
    },
  }
];