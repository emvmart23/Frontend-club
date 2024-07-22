import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import UnitEditForm from "../UnitEditForm";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import api from "@/service";

interface Props {
  unit: UnitMeasure;
  setIsOpen: (value: boolean) => void;
}

export default function UnitDetails({ unit, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient()

  const deleteUnits = async () => {
    try {
      const response = await api.delete(`/unit_measures/delete/${unit.unit_id}`);
      if (response.status === 200) {
        toast({
          description: "Metodo eliminado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("units");
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
      <SheetTitle>Informacion de la unidad</SheetTitle>

      <UnitEditForm
        unit={unit}
        setIsOpen={setIsOpen}
        setIsPending={setIsPending}
      />
      <SheetFooter className="mt-2 p-2">
        <Button type="submit" form="update-units-form" disabled={isPending}>
          <Pencil className="mr-2 h-4 w-4" />
          Aplicar
        </Button>
        <Button variant="destructive" onClick={deleteUnits}>
          <X className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
