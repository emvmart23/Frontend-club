import { Button } from "@/components/ui/Button";
import {
  DialogClose,
  DialogFooter
} from "@/components/ui/Dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  setIsOpen: (value: boolean) => void;
  header: Header
}

export default function OrdersOfUserAction({ setIsOpen, header }: Props) {
  const [isPending, setIsPending] = useState(false);

  const anulatedOrder = (data: any) => {
    console.log(data, header);
  };

  return (
    <DialogFooter className="flex sm:justify-between gap-4">
      <DialogClose asChild>
        <Button className="w-full" variant="outline">
          Cerrar
        </Button>
      </DialogClose>
      <Button
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
