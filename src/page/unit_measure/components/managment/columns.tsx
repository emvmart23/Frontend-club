import { Sheet, SheetTrigger } from "@/components/ui/Sheet";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import UnitDetails from "../UnitDetails";
import { useState } from "react";

export const columns: ColumnDef<UnitMeasure>[] = [
  {
    accessorKey: "abbreviation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Abreviacion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("abbreviation")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descripcion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const unit = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false)
      return (
        <Sheet open={open} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Ver</Button>
          </SheetTrigger>
          <UnitDetails unit={unit} setIsOpen={setIsOpen}  />
        </Sheet>
      );
    },
  }
];