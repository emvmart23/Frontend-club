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
import { toast } from "@/hooks/useToast";
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
    orderId: number
  ) => {
    const updatedOrders = formatOrder.map((order: Product) => {
      if (order.id === orderId) {
        return {
          ...order,
          initialPrice: order.price,
          price: e.target.checked ? 0 : order.initialPrice,
        };
      }
      return order;
    });
    setFormatOrder(updatedOrders);
  };

  const deleteOrder = (productId: number) => {
    const newPendingOrders = pendingOrders.filter(
      (product) => product.id !== productId
    ) as Product[];
    setPendingOrders(newPendingOrders);
    toast({
      description: "Producto eliminado",
      variant: "destructive",
    });
  };
  
  return (
    <div className="overflow-auto mt-8 h-[12rem] w-full relative z-50">
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
          {formatOrder?.length == 0 ? (
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
