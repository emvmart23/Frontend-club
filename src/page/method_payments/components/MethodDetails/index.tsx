import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import MethodEditForm from "../MethodEditForm";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";

interface Props {
  data: MethodPayment;
  setIsOpen: (value: boolean) => void;
}

export default function MethodsDetails({ data, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient()

  const deleteMethod = async () => {
    try {
      const response = await api.delete(`/payments/delet/${data.id}`);
      if (response.status === 200) {
        toast({
          description: "Metodo eliminado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("methods");
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al eliminar el metodo",
        variant: "destructive",
      })
    }
  };

  return (
    <SheetContent>
      <SheetTitle>Informacion del metodo</SheetTitle>
      <MethodEditForm
        data={data}
        setIsOpen={setIsOpen}
        setIsPending={setIsPending}
      />
      <SheetFooter className="mt-2 p-2">
        <Button type="submit" form="update-customers-form" disabled={isPending}>
          <Pencil className="mr-2 h-4 w-4" />
          Aplicar
        </Button>
        <Button variant="destructive" onClick={deleteMethod}>
          <X className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
