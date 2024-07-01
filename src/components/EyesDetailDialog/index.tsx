import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface Props {
  data: Header;
}

export default function OrdersAtendeedDetails({ data }: Props) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Productos atendidos</DialogTitle>
        <DialogDescription>
          <span>
            <strong>Anfitriona:</strong>
            {data.hostess}
          </span>
        </DialogDescription>
      </DialogHeader>
      <ul className="grid gap-4 py-4 font-medium pl-6 list-disc">
        {data.orders.map((order, index) => (
          <li key={index}>
            <span>
              <strong>{order.count} </strong>
              {order.name}
            </span>
          </li>
        ))}
      </ul>
    </DialogContent>
  );
}
