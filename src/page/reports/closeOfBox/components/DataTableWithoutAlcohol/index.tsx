import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

const titles = [
  { title: "Mozos" },
  { title: "Efectivos" },
  { title: "Transferencia" },
  { title: "Total" },
];

export default function DataTableWithoutAlcohol() {
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
