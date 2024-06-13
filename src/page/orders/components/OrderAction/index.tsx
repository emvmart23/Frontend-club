import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Minus, Pencil, Plus } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/useToast";

interface Props {
  pendingOrders: Product[]; // este pendingOrders es un array que alamcena  los productos por ejemplo subo un item a este array y si se repite este esta siendo pasado con un reduce para que si el item se repite salga solo un item con este nombre pero con un contador de este producto pro ejemplo esta es la estructura { id:number, name:string, price:number, count:number }[]
  isLoading: boolean;
  setPendingOrders: (value: Product[]) => void; // alterador de pendingOrders
  filteredProducts: Product[]; // este es un array con productos que tiene un filter para que puede ser buscado mediante su key esta es la estructura { id:number, name:string, price:number }[]
  setFilteredProducts: (value: Product[]) => void;
  formatOrders: (array: Product[]) => Product[];
  setFormatOrder: (value: Product[]) => void;
}

export default function OrderAction({
  setPendingOrders,
  pendingOrders,
  filteredProducts,
  formatOrders,
  setFormatOrder,
}: Props) {
  const [editedPrices, setEditedPrices] = useState<{
    [id: number]: number | string;
  }>({});
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [edit, setEdit] = useState(false);

  const toggleEdit = (productId: number) => {
    const product = filteredProducts.find((p) => p.id === productId);

    if (!product) return;

    if ((editedPrices[productId] as number) < product.price) {
      return toast({
        description: "El precio no puede ser menor al precio del producto",
        variant: "warning",
      });
    }

    setEditingProductId(editingProductId === productId ? null : productId);
    setEdit(!edit);
  };

  const addOrder = (productId: number) => {
    const newProducts = [...filteredProducts];
    const orderInProcess = newProducts.find(
      (product) => product.id === productId
    ) as Product;

    const orderWithEditedPrice = {
      ...orderInProcess,
      price: (editedPrices[productId] as number) || orderInProcess.price,
    };

    setPendingOrders([...pendingOrders, orderWithEditedPrice]);
    toast({
      description: "Producto agregado",
      variant: "success",
    });
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setEditedPrices({ ...editedPrices, [productId]: value });
  };

  const deleteOneOrder = (productId: number) => {
    const index = pendingOrders.findIndex((p) => p.id === productId);
    if (index !== -1) {
      const newPendingOrders = [...pendingOrders];
      newPendingOrders.splice(index, 1);
      setPendingOrders(newPendingOrders);

      const updatedFormatOrders = formatOrders(newPendingOrders);
      setFormatOrder(updatedFormatOrders);
    }
  };

  return (
    <div className="mx-auto">
      {filteredProducts.length === 0 ? (
        <div className="h-52 flex justify-center items-center font-medium">
          No hay resultados
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 w-[88%] content-center mx-auto md:p-2">
          {filteredProducts.map((product) => {
            const cardById = product.id === editingProductId;

            return (
              <Card
                key={product.id}
                className="relative flex flex-col justify-center items-center md:p-4 h-36 max-w-[230px] border-gray-700 border-2 mx-auto"
              >
                <CardContent>
                  <Input
                    value={
                      editedPrices[product.id] !== undefined
                        ? editedPrices[product.id]?.toString()
                        : product.price.toString()
                    }
                    disabled={!edit || !cardById}
                    onChange={(e) => handlePriceChange(e, product.id)}
                    className={`${
                      cardById
                        ? edit
                          ? "shadow-xl h-[3rem]"
                          : "text-black"
                        : ""
                    } transition-all duration-500 relative text-center`}
                  />
                </CardContent>
                <CardTitle className="cursor-pointer">{product.name}</CardTitle>
                <Button
                  disabled={edit}
                  className="rounded-full p-2 absolute -right-4 w-8 h-8"
                  onClick={() => addOrder(product.id)}
                >
                  <Plus className="" />
                </Button>
                <Button
                  disabled={edit}
                  className="rounded-full p-2 absolute -left-4 w-8 h-8"
                  onClick={() => deleteOneOrder(product.id)}
                >
                  <Minus className="" />
                </Button>
                {edit && cardById ? (
                  <Button
                    type="submit"
                    form="update-orders-form"
                    className="absolute -top-3 -right-3 rounded-full w-8 h-8 p-2 bg-green-600 hover:bg-green-600"
                    onClick={() => toggleEdit(product.id)}
                  >
                    <Check className="w-full h-full" />
                  </Button>
                ) : (
                  <Button
                    className="absolute -top-4 -right-4 rounded-full w-10 h-10 p-2"
                    onClick={() => toggleEdit(product.id)}
                  >
                    <Pencil className="w-full h-full" />
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
