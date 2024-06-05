import { Button } from "@/components/ui/Button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface Props {
  data: Orders[];
}

export default function OrdersAtendeedDetails({ data }: Props) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Productos atendidos</DialogTitle>
      </DialogHeader>
      <ul className="grid gap-4 py-4 font-medium pl-6 list-disc">
        {data.map((item, index) => (
          <li key={index}>
            {" "}
            <span>{item.count}</span> {item.name}
          </li>
        ))}
      </ul>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
