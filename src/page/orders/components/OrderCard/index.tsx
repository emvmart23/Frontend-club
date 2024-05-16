import { CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface Props {
  id: number
  price: number;
  name: string;
  edit: boolean;
  addOrder: (productId: number) => void;
  editingProductId: number | null;
}

export default function CardProduct({id, name, price, edit, addOrder, editingProductId}: Props) {
  const cardById = id === editingProductId
  return (
    <>
      <CardContent>
        <Input
          value={price}
          disabled={!edit || !cardById}
          className={`${
            cardById ?  (edit ? "shadow-xl h-[3.5rem]" : "text-black") : ""
          } transition-all duration-500 relative text-center`}
          />
      </CardContent>
      <CardTitle 
      onClick={() => addOrder(id)}
      className="cursor-pointer">{name}</CardTitle>
    </>
    
  );
}
