import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
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
  pendingOrders: Product[];
  setPendingOrders: (product: Product[]) => void;
}

export default function OrderTables({
  formatOrders,
  pendingOrders,
  setPendingOrders,
}: Props) {
  const deleteOrder = (productId: number) => {
    const newPendingOrders = pendingOrders.filter(
      (product) => product.id !== productId
    ) as Product[];
    setPendingOrders(newPendingOrders);
  };

  // const applyCourtesy = (orderId: number) => {
  //   const order = pendingOrders.find(({id}) => id === orderId) as Product;
  //   const apply = {
  //     ...order,
  //     price:0
  //   };
  //   setPendingOrders([...pendingOrders, apply])
  // }

  return (
    <div className="overflow-auto mt-16 h-[15.3rem] w-full relative">
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            {/* <TableHead>Cortesia</TableHead> */}
            <TableHead>Cantidad</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formatOrders.length == 0 ? (
            <TableRow>
              <TableCell className="p-16 text-center font-semibold" colSpan={5}>
                No hay pedidos
              </TableCell>
            </TableRow>
          ) : (
            formatOrders.map(({ id, name, price, count }) => (
              <TableRow key={id}>
                {/* <TableCell>
                  <Checkbox />
                </TableCell> */}
                <TableCell>{count}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>S/.{price}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteOrder(id)} className="w-16 h-8">
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
