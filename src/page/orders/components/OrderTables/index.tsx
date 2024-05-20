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

export default function OrderTables({ pendingOrders, totalPrice }: Props) {
  // const orderInProcess = []
  // const orders = pendingOrders.map((x) => {
  //   if(orderInProcess.some((val) => { return val[x.category_id] === x[d] }))
  // });

  // console.log(orders);
  // console.log(pendingOrders);

  // const deleteOrder = (orderId: number) => {
  //   const newOrders = pendingOrders.filter((order) => order.id!== orderId);
  //   setPendingOrders(newOrders);
  // }

  // const reduce: { [key: number]: number } = pendingOrders.reduce(
  //   (acc: { [key: number]: number }, { id }) => {
  //     acc[id] = acc[id] ? acc[id] + 1 : 1;
  //     return acc;
  //   },
  //   {}
  // );

  // const result = Object.entries(reduce)
  //   .map(([id, count]) => ({ id, count }))
  //   .sort((a, b) => b.count - a.count);

  return (
    <div className="overflow-auto md:h-52 lg:h-72">
      <Table className="mb-32">
        <TableHeader>
          <TableRow>
            <TableHead>Cantidad</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Accion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {pendingOrders.length == 0 ? (
            <TableRow className="abolute left-10">
                <TableCell colSpan={4}>No hay pedidos</TableCell>
            </TableRow>
          ) : (
            pendingOrders.map(({ id, name, price }) => (
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
