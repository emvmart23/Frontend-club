import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

interface Props {
  formatOrders: Product[];
}

export default function OrderTables({ formatOrders }: Props) {
  return (
    <div className="overflow-auto mt-16 h-[15.3rem] w-full relative">
      <Table className="h-full ">
        <TableHeader>
          <TableRow>
            <TableHead>Cantidad</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formatOrders.length == 0 ? (
            <TableRow>
              <TableCell className="p-16 text-center font-semibold" colSpan={4}>
                No hay pedidos
              </TableCell>
            </TableRow>
          ) : (
            formatOrders.map(({ id, name, price, count }) => (
              <TableRow className="" key={id}>
                <TableCell>{count}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>S/.{price}</TableCell>
                <TableCell>
                  <Button className="w-16 h-8">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
