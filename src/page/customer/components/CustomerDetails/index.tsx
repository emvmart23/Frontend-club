import { Button } from "@/components/ui/Button";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import CustomerEditForm from "../CustomerEditForm";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";

interface Props {
  customer: Customer;
  setIsOpen: (value: boolean) => void;
}

export default function CustomerDetails({ customer, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const deleteCustomer = async () => {
    try {
      const response = await api.delete(`/customers/delete/${customer.id}`);
      if (response.status === 200) {
        toast({
          description: "Cliente eliminado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("customer");
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al eliminar el cliente",
        variant: "destructive",
      });
    }
  };

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
        <Button variant="destructive" onClick={deleteCustomer}>
          <X className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
