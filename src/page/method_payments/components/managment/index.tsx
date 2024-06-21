import { Button } from "@/components/ui/Button";
import { ColumnDef } from "@tanstack/react-table";

export const column: ColumnDef<MethodPayment>[] = [
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
      row.original;

      return <div>data</div>;
    },
  },
];
