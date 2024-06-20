import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil } from "lucide-react";
import { useState } from "react";
import CustomerEditForm from "../CustomerEditForm";

interface Props {
  customer:Customer
  setIsOpen: (value:boolean) =>void
}

export default function CustomerDetails({ customer, setIsOpen} : Props) {
    const [isPending, setIsPending] = useState(false);
    return (
      <SheetContent>
        <SheetTitle>Informacion del cliente</SheetTitle>
        <CustomerEditForm
          customer={customer}
          setIsOpen={setIsOpen}
          setIsPending={setIsPending}
        />
        <SheetFooter className="mt-2 p-2">
          <Button type="submit" form="update-customers-form" disabled={isPending}>
            <Pencil className="mr-2 h-4 w-4" />
            Aplicar
          </Button>
        </SheetFooter>
      </SheetContent>
    );
}
