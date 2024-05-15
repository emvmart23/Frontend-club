import { toast } from "@/hooks/useToast";
import api from "@/service";
import { useQueryClient } from "react-query";
import CardProduct from "../CardProduct";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Pencil } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface Props {
  product: Product[];
  isLoading: boolean;
}

export default function OrderAction({ product }: Props) {
  const [edit, setEdit] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [editedPrice, setEditedPrice] = useState<string | undefined>(undefined);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  const toggleEdit = (productId: number) => {
    const price = product.find((product) => product.id === productId)?.price;
    setEditingProductId(productId);
    setEditedPrice(price?.toString());
    setEdit(!edit);
  };

  return (
    <form
      id="update-orders-form"
      onSubmit={onSubmit}
      className="space-y-5 w-[95%]"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-4 2xl:w-[80%] mx-auto p-2">
        {product.map((product) => {
          const cardById = product.id == editingProductId
          return (
            <Card
              key={product.id}
              className="relative flex flex-col justify-center items-center p-4 h-52 max-w-[246px] border-gray-700 border-2 mx-auto"
            >
              <CardProduct
                name={product.name}
                price={product.price}
                cardById={cardById}
                edit= {edit}
              />
              {edit && cardById ? (
                <Button
                  type="submit"
                  form="update-orders-form"
                  className="absolute -top-3 -right-3 rounded-full w-8 h-8 p-2"
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
    </form>
  );
}
