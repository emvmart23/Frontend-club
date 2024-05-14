import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Props {
  price: number;
  name: string;
}

export default function CardProduct({ name, price }: Props) {
  return (
    <Card className="">
      <CardContent>
        <Input type="number" placeholder="Precio" value={price} className="" />
      </CardContent>
      <CardTitle>{name}</CardTitle>
    </Card>
  );
}
