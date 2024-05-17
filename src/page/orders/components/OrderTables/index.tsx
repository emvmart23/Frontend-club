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
console.log(pendingOrders)
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
        {pendingOrders.map(({id, name, price}) => (
          <TableRow key={id}>
            <TableCell>count</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{price}</TableCell>
          </TableRow>
        ))}
      </TableBody>`
      <TableFooter></TableFooter>
    </Table>
  );
}
