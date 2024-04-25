import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil } from "lucide-react";
import { useState } from "react";
import CategoryEditForm from "../CategoryEditForm";

interface Props {
  category:Category
  setIsOpen: (value:boolean) =>void
}

export default function CaregoryDetails({ category, setIsOpen} : Props) {
    const [isPending, setIsPending] = useState(false);
    return (
      <SheetContent>
        <SheetTitle>Informacion de la categoria</SheetTitle>
  
        <CategoryEditForm
          category={category}
          setIsOpen={setIsOpen}
          setIsPending={setIsPending}
        />
        <SheetFooter className="mt-2 p-2">
          <Button type="submit" form="update-categories-form" disabled={isPending}>
            <Pencil className="mr-2 h-4 w-4" />
            Aplicar
          </Button>
        </SheetFooter>
      </SheetContent>
    );
}
