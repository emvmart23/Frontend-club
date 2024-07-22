import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import CategoryEditForm from "../CategoryEditForm";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import api from "@/service";

interface Props {
  category: Category;
  setIsOpen: (value: boolean) => void;
}

export default function CaregoryDetails({ category, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const deleteCategories = async () => {
    try {
      const response = await api.delete(
        `/categories/delete/${category.category_id}`
      );
      if (response.status === 200) {
        toast({
          description: "Categoria eliminado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("categories");
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al eliminar la categoria",
        variant: "destructive",
      });
    }
  };

  return (
    <SheetContent>
      <SheetTitle>Informacion de la categoria</SheetTitle>

      <CategoryEditForm
        category={category}
        setIsOpen={setIsOpen}
        setIsPending={setIsPending}
      />
      <SheetFooter className="mt-2 p-2">
        <Button
          type="submit"
          form="update-categories-form"
          disabled={isPending}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Aplicar
        </Button>
        <Button variant="destructive" onClick={deleteCategories}>
          <X className="mr-2 h-4 w-4" />
          Eliminat
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
