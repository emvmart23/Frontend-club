import { Button } from "@/components/ui/Button";
import { DialogFooter } from "@/components/ui/Dialog";
import { toast } from "@/hooks/useToast";
import api from "@/service";
import { useState } from "react";
import { useQueryClient } from "react-query";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function OrdersOfUserAction({ setIsOpen, header }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient()
  const anulatedOrder = async () => {
    setIsPending(true);
    try {
      const response = await api.post(`/header/anulated/${header?.id}`);
      if (response.status === 200) {
        toast({
          description: "Pedido anulado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("headers");
      setIsOpen(false)
      setIsPending(false);
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al anular el pedido",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <DialogFooter className="flex sm:justify-between gap-4">
      {Boolean(header.state_doc) === !false && (
        <Button
          className="w-full"
          variant="outline"
          disabled={isPending}
          onClick={anulatedOrder}
        >
          Anular
        </Button>
      )}
    </DialogFooter>
  );
}
