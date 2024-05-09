import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Pencil } from "lucide-react";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";

interface Props {
  box: Box;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function BoxDetails({ box }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const closeBox = async () => {
    try {
      const { status } = await api.post(`/boxes/close/${box.id}`);
      if (status === 200) {
        toast({
          description: "Caja cerrada correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("box");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SheetContent className="w-[400px]">
      <SheetTitle>Acciones</SheetTitle>

      <SheetFooter>
        <Button
          variant="destructive"
          className="mt-10"
          type="submit"
          onClick={closeBox}
          disabled={isPending}
        >
          Cerrar caja
        </Button>
        <Button
          className="mt-10"
          type="submit"
          onClick={closeBox}
          disabled={isPending}
        >
          Editar caja
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
