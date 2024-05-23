import { Button } from "@/components/ui/Button";
import { CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface Props {
  pendingOrders: Product[];
  formatOrders: Product[];
  setPendingOrders: (value: Product[]) => void;
  id: number;
  price: number;
  name: string;
  edit: boolean;
  filteredProducts: Product[];
  editingProductId: number | null;
}

export default function OrderCard({
  id,
  name,
  price,
  edit,
  filteredProducts,
  editingProductId,
  setPendingOrders,
  pendingOrders,
}: Props) {
  const [editedPrice, setEditedPrice] = useState<number>(price);
  const cardById = id === editingProductId;

  const addOrder = (productId: number, editedPrice: number) => {
    const newProducts = [...filteredProducts];
    const orderInProcess = newProducts.find(
      (product) => product.id === productId
    ) as Product;
    // const orderWithEditedPrice = {
    //   ...orderInProcess,
    //   price: editedPrice
    // };
    setPendingOrders([...pendingOrders, orderInProcess]);
    setEditedPrice(orderInProcess.price)
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(Number(e.target.value));
  };

  const deleteOneOrder = (productId: number) => {
    const index = pendingOrders.findIndex((p) => p.id === productId);
    if (index !== -1) {
      pendingOrders.splice(index, 1);
      return pendingOrders;
    }
    return pendingOrders;
  };

  return (
    <>
      <CardContent>
        <Input
          value={edit && cardById ? editedPrice : price}
          disabled={!edit || !cardById}
          onChange={handlePriceChange}
          className={`${
            cardById ? (edit ? "shadow-xl h-[3rem]" : "text-black") : ""
          } transition-all duration-500 relative text-center`}
        />
      </CardContent>
      <CardTitle className="cursor-pointer">{name}</CardTitle>
      <Button
        className="rounded-full p-2 absolute -right-4 w-8 h-8"
        onClick={() => addOrder(id, editedPrice)}
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
