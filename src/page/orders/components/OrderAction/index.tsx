import CardProduct from "../OrderCard";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Pencil } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { differenceInSeconds } from "date-fns";

interface Props {
  product: Product[];
  pendingOrders:Product[]
  isLoading: boolean;
  setPendingOrders: (value: Product[]) => void;
}

export default function OrderAction({ product, setPendingOrders, pendingOrders }: Props) {
  const [edit, setEdit] = useState(false);
  //const [editedPrice, setEditedPrice] = useState<string | undefined>(undefined);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  const toggleEdit = (productId: number) => {
    //const price = product.find((product) => product.id === productId)?.price;
    setEditingProductId(productId);
    //setEditedPrice(price?.toString());
    setEdit(!edit);
  };

  const addOrder = (productId: number) => {
    const newProducts = [...product]
    const orderInProcess = newProducts.find((product) => product.id === productId) as Product;
    setPendingOrders([...pendingOrders, orderInProcess]);
  }

  const handleBlur = (event:any) => {
    const cardElement = event.currentTarget;
    const clickedOutside = !cardElement.contains(event.relatedTarget);
    clickedOutside ? setEdit(false) : event.stopPropagation();
  };

  const data = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4]

  // const  suma = data.reduce ((acc, number) => {
  //   return acc + number
  // })
  // console.log(suma)

  // function getAverage (array:number[]) {
  //   let sum = 0;
  //   for (let i = 0; i < array.length; i++) {
  //     sum += array[i]
  //   }
  //   return sum / array.length;
  // }

  const getAverageWithReduce = data.reduce((sum, currentValue) => sum + currentValue, 0) / data.length;
  console.log(getAverageWithReduce);

  // console.log(getAverage(data));

  const ocurrencces =  data.reduce(( acc: {[ key: number ] :number }, curr ) => {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {})
  
  console.log(ocurrencces)


  
  return (
    <form
      id="update-orders-form"
      onSubmit={onSubmit}
      className="space-y-5 w-[95%]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 2xl:w-[80%] mx-auto md:p-2">
        {product.map((product) => {
          const cardById = product.id == editingProductId
          return (
            <Card
              key={product.id}
              className="relative flex flex-col justify-center items-center md:p-4 h-36 max-w-[230px] border-gray-700 border-2 mx-auto"
              onBlur={ handleBlur}
            >
              <CardProduct
                {...product}
                editingProductId={editingProductId}
                edit= {edit}
                addOrder= {addOrder}
              />
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
    </form>
  );
}
