import { useState } from "react";
import { Button } from "@/components/ui/Button";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

interface Props {
  box: Box;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function OpeningBoxDetails({ box }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const closeBox = async () => {
    setIsPending(true);
    try {
      const response = await api.post(`/boxes/close/${box.id}`);
      if (response.status === 200) {
        toast({
          description: "Caja cerrada correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("box");
      setIsPending(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <DialogContent className="w-[400px]">
      <DialogHeader>
        <DialogTitle >Acciones</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-x-4 gap-y-6 justify-center items-center mt-6">
        <Button
          className="w-full"
          variant="destructive"
          type="submit"
          onClick={closeBox}
          disabled={isPending}
        >
          Cerrar caja
        </Button>
      </div>
    </DialogContent>
  );
}
