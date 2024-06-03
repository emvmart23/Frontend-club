import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { toast } from "@/hooks/useToast";
import api from "@/service";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "react-query";

interface Props {
  data: Header;
}

const getJustHostess = (orders: Orders[]) => {
  const findHostess = orders.find((h) => h.hostess);
  return findHostess ? findHostess.hostess : "";
};

export default function CardDetails({ data }: Props) {
  const queryClient = useQueryClient();
  const [isPending, setisPending] = useState(false);

  const handlerButtonAttended = async (id: number) => {
    setisPending(true);
    try {
      const response = await api.post(`/attended/${id}`);
      if (response.status === 200) {
        toast({
          description: "Pedido atendido correctamente",
          variant: "success",
        });
      } else {
        toast({
          description: "Error al antender",
          variant: "destructive",
        });
      }
      queryClient.invalidateQueries("orders");
    } catch (error) {
      console.log(error);
    } finally {
      setisPending(false);
    }
  };

  return (
    <Card key={data.id} className="w-[15rem] h-auto relative">
      <CardHeader className="p-0">
        <CardTitle className="bg-green-500 p-4 text-center rounded-t-md">
          Pedido {data.id}
        </CardTitle>
        <CardDescription className="space-y-2 px-6 py-5">
          <p>Mozo : {data.mozo}</p>
          <p>Anfitriona : {getJustHostess(data.orders)}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="mb-20">
        {data.orders.map((order, index) => {
          return (
            <ul key={index} className="font-semibold list-disc">
              <li className="ml-3">
                {order.count} <span>{order.name}</span>
              </li>
            </ul>
          );
        })}
      </CardContent>
      <CardFooter className=" w-full absolute bottom-0">
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() => handlerButtonAttended(data.id)}
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          <span>Atender</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
