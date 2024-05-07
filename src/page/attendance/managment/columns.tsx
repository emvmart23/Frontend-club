import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { getUsersWithOutRedux } from "@/store/slices/user/thunk";
import { useEffect, useState } from "react";

export const columns: ColumnDef<Attendace>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="ml-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [users, setUsers] = useState<User[]>([]);

      const fetchUsers = async () => {
        const allUsers = await getUsersWithOutRedux();
        setUsers(allUsers);
      };
      const formatUsers = users.map(i => i.user)
      formatUsers.splice(0, 0, "");
      const user_id = row.getValue("user_id") as number;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        fetchUsers();
      },[]);

      return <div>{formatUsers[user_id]}</div>;
    },
  },
  {
    accessorKey: "date",
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
      return <div>{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "present",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asistio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive =
        Boolean(row.getValue("present")) === true
          ? "bg-green-500"
          : "bg-red-500";
      return <div className={`${isActive} rounded-full w-5 h-5`} />;
    },
  },
];
