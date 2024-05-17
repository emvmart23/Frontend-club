import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

interface Props {
  pendingOrders: Product[];
}

export default function OrderTables({ pendingOrders }: Props) {
  // const orderInProcess = []
  // const orders = pendingOrders.map((x) => {
  //   if(orderInProcess.some((val) => { return val[x.category_id] === x[d] }))
  // });

  // console.log(orders);
  console.log(pendingOrders);

  // const deleteOrder = (orderId: number) => {
  //   const newOrders = pendingOrders.filter((order) => order.id!== orderId);
  //   setPendingOrders(newOrders);
  // }

  const reduce: { [key: number]: number } = pendingOrders.reduce(
    (acc: { [key: number]: number }, { id }) => {
      acc[id] = acc[id] ? acc[id] + 1 : 1;
      return acc;
    },
    {}
  );

  console.log(reduce);

  const result = Object.entries(reduce)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);

  console.log("data", result);
  return (
    <Table className="mb-20 border border-black">
      <TableHeader>
        <TableRow>
          <TableHead>Cantidad</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Precio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {pendingOrders.map(({ id, name, price }) => (
          <TableRow key={id}>
            <TableCell>count</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>
              <Button className="w-16 h-8">Eliminar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      `
    </Table>
  );
}
