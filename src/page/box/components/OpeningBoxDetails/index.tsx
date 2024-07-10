import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Loader2 } from "lucide-react";
import { getHeaders } from "@/helpers/getHeaders";

interface Props {
  box: Box;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function OpeningBoxDetails({ box, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [headers, setHeaders] = useState<Header[]>([]);
  const queryClient = useQueryClient();

  const isActive = headers.some((header) => !!header.state_doc === true);

  const closeBox = async () => {
    if (isActive) {
      toast({
        description: "Finaliza todas las notas de venta",
        variant: "warning",
      });
      return;
    }

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
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
      setIsOpen(false);
    }
  };

  const fetchHeaders = async () => {
    try {
      const { header } = await getHeaders();
      setHeaders(header);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHeaders();
  }, []);

  return (
    <DialogContent className="w-[400px]">
      <DialogHeader>
        <DialogTitle>Acciones</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-x-4 gap-y-6 justify-center items-center mt-6">
        <Button
          className="w-full"
          variant="destructive"
          type="submit"
          onClick={closeBox}
          disabled={isPending}
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Cerrar caja
        </Button>
      </div>
    </DialogContent>
  );
}
