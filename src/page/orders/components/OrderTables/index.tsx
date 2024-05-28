import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { ChangeEvent } from "react";

interface Props {
  pendingOrders: Product[];
  setPendingOrders: (product: Product[]) => void;
  formatOrder: Product[];
  setFormatOrder: (product: Product[]) => void;
}

export default function OrderTables({
  pendingOrders,
  setPendingOrders,
  formatOrder,
  setFormatOrder,
}: Props) {

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    orderId: number,
  ) => {
    const updatedOrder = formatOrder.map((order : Product) => {
      if (order.id === orderId) {
        return {
          ...order,
          initialPrice: 20,
          price: e.target.checked ? 0 : order.price, 
        };
      }
      return order;
    });
    setFormatOrder(updatedOrder);
  };
  
  const deleteOrder = (productId: number) => {
    const newPendingOrders = pendingOrders.filter(
      (product) => product.id !== productId
    ) as Product[];
    setPendingOrders(newPendingOrders);
  };
  
  return (
    <div className="overflow-auto mt-16 h-[15.3rem] w-full relative">
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead>Cortesia</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formatOrder.length == 0 ? (
            <TableRow>
              <TableCell className="p-16 text-center font-semibold" colSpan={5}>
                No hay pedidos
              </TableCell>
            </TableRow>
          ) : (
            formatOrder.map(({ id, name, price, count }) => (
              <TableRow key={id}>
                <TableCell className="px-[2.5rem]">
                  <Input
                    className="w-4 h-4"
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, id)}
                  />
                </TableCell>
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
