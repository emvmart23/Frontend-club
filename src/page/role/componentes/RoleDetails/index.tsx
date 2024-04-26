import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil } from "lucide-react";
import { useState } from "react";
import RoleEditForm from "../RoleEditForm";

interface Props {
  role:Role
  setIsOpen: (value:boolean) =>void
}

export default function RoleDetails({ role, setIsOpen} : Props) {
    const [isPending, setIsPending] = useState(false);
    return (
      <SheetContent>
        <SheetTitle>Informacion del rol</SheetTitle>
  
        <RoleEditForm
          role={role}
          setIsOpen={setIsOpen}
          setIsPending={setIsPending}
        />
        <SheetFooter className="mt-2 p-2">
          <Button type="submit" form="update-roles-form" disabled={isPending}>
            <Pencil className="mr-2 h-4 w-4" />
            Aplicar
          </Button>
        </SheetFooter>
      </SheetContent>
    );
}
