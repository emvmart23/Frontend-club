import { CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Props {
  price: number;
  name: string;
  cardById: boolean;
  edit: boolean;
}

export default function CardProduct({ name, price, cardById, edit}: Props) {
  return (
    <>
      <CardContent>
        <Input
          value={price}
          disabled={!edit}
          className={`${
            cardById ?  (edit ? "shadow-xl h-[3.5rem]" : "text-black") : ""
          } transition-all duration-500 relative text-center`}
          />
      </CardContent>
      <CardTitle>{name}</CardTitle>
    </>
    
  );
}
