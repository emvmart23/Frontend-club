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
  totalPrice: number;
  pendingOrders: Product[];
  
}

export default function OrderTables({ pendingOrders }: Props) {
  return (
    <div className="overflow-auto mt-16 h-[15.3rem] w-full">
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead>Cantidad</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingOrders.length == 0 ? (
            <TableRow>
                <TableCell className="p-16 text-center font-semibold" colSpan={4}>No hay pedidos</TableCell>
            </TableRow>
          ) : (
            pendingOrders.map(({ id, name, price}) => (
              <TableRow className="" key={id}>
                <TableCell>count</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>
                  <Button className="w-16 h-8">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>S/.{totalPrice}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}
