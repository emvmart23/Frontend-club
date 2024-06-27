import { Button } from "@/components/ui/Button";
import { DialogFooter } from "@/components/ui/Dialog";
import { toast } from "@/hooks/useToast";
import api from "@/service";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function OrdersOfUserAction({ setIsOpen, header }: Props) {
  const [isPending, setIsPending] = useState(false);

  const anulatedOrder = async () => {
    setIsPending(true);
    try {
      const response = await api.post(`/header/anulated/${header.id}`);
      if (response.status === 200) {
        toast({
          description: "Pedido anulado correctamente",
          variant: "success",
        });
      }
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
      <Button
        onClick={anulatedOrder}
        variant="destructive"
        className="w-full"
        disabled={isPending}
        type="submit"
        form="box-form"
      >
        {isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        Anular pedido
      </Button>
    </DialogFooter>
  );
}
