import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { getUsers } from "@/helpers/users/getUsers";
import { useQuery } from "react-query";

const titles = [
  { title: "Mozos" },
  { title: "Efectivos" },
  { title: "Transferencia" },
  { title: "Total" },
];

export default function DataTableWithtAlcohol() {
  const { data } = useQuery("example", getUsers);
  console.log("users", data);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {titles.map(({ title }, index) => (
            <TableHead key={index}>{title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
