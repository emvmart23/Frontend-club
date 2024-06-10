import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface Props {
  data: Orders[];
}

export default function OrdersAtendeedDetails({ data }: Props) {
  console.log(data);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Productos atendidos</DialogTitle>
      </DialogHeader>
      <ul className="grid gap-4 py-4 font-medium pl-6 list-disc">
        {data.map((item, index) => (
          <li key={index}>
            <span className="hidden">daaa</span>
          </li>
        ))}
      </ul>
    </DialogContent>
  );
}
