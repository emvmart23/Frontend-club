import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";

interface Props {
  box: Box;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}
export default function OpeningBoxDetails({ box }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const closeBox = async () => {
    setIsPending(true)
    try {
      const response = await api.post(`/boxes/close/${box.id}`);
      if (response.status === 200) {
        toast({
          description: "Caja cerrada correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("box");
      setIsPending(false)
    } catch (error) {
      console.log(error);
    }finally {
      setIsPending(false);
    }
  };

  return (
    <SheetContent className="w-[400px]">
      <SheetTitle>Acciones</SheetTitle>
      <SheetFooter className="w-full ">
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
