import { Button } from "@/components/ui/Button";
import { CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Plus } from "lucide-react";

interface Props {
  id: number;
  price: number;
  name: string;
  edit: boolean;
  addOrder: (productId: number) => void;
  editingProductId: number | null;
}

export default function CardProduct({
  id,
  name,
  price,
  edit,
  addOrder,
  editingProductId,
}: Props) {
  const cardById = id === editingProductId;
  return (
    <>
      <CardContent>
        <Input
          value={price}
          disabled={!edit || !cardById}
          className={`${
            cardById ? (edit ? "shadow-xl h-[3rem]" : "text-black") : ""
          } transition-all duration-500 relative text-center`}
        />
      </CardContent>
      <CardTitle className="cursor-pointer">
          {name}
      </CardTitle>
      <Button  className="rounded-full p-2 absolute -right-4 w-7 h-7" onClick={() => addOrder(id)}>
        <Plus className=""/>
      </Button>
    </>
  );
}
