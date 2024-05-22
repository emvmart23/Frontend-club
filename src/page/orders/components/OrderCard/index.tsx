import { Button } from "@/components/ui/Button";
import { CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface Props {
  formatOrders: Product[];
  setPendingOrders: (value: Product[]) => void;
  id: number;
  price: number;
  name: string;
  edit: boolean;
  addOrder: (productId: number) => void;
  editingProductId: number | null;
  //onChangeInput: (e: ChangeEvent<HTMLInputElement>, productId: number) => void;
}

export default function OrderCard({
  id,
  name,
  price,
  edit,
  addOrder,
  editingProductId,
  formatOrders,
  //onChangeInput,
  setPendingOrders,
}: Props) {
  const [editedPrice, setEditedPrice] = useState(price);
  const cardById = id === editingProductId;

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(Number(e.target.value));
    //onChangeInput(e, id);
  };
  console.log(formatOrders)
  const deleteOneOrder = (ProductId: number) => {
    const newPendingOrders = formatOrders.filter((product) => {
      if (product.id == ProductId) {
        return product.count--;
      }
    }) as Product[];
    setPendingOrders(newPendingOrders);
    console.log("newPendingOrders", newPendingOrders)
  };

  return (
    <>
      <CardContent>
        <Input
          value={edit && cardById ? editedPrice : price}
          disabled={!edit || !cardById}
          onChange={handlePriceChange}
          onBlur={() => {
            setEditedPrice(price);
          }}
          className={`${
            cardById ? (edit ? "shadow-xl h-[3rem]" : "text-black") : ""
          } transition-all duration-500 relative text-center`}
        />
      </CardContent>
      <CardTitle className="cursor-pointer">{name}</CardTitle>
      <Button
        className="rounded-full p-2 absolute -right-4 w-8 h-8"
        onClick={() => addOrder(id)}
      >
        <Plus className="" />
      </Button>
      <Button
        className="rounded-full p-2 absolute -left-4 w-8 h-8"
        onClick={() => deleteOneOrder(id)}
      >
        <Minus className="" />
      </Button>
    </>
  );
}
