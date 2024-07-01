import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";
import { useState } from "react";
import ProductEditForm from "../ProductEditForm";
import { Button } from "@/components/ui/Button";
import { Pencil, X } from "lucide-react";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";

interface Props {
  product: Product;
  open: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ProductDetails({ product, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient()

  const deletedProduct = async () => {
    setIsPending(true);
    try {
      const response = await api.delete(`/products/delete/${product.id}`);
      if (response.status === 200) {
        toast({
          description: "Producto eliminado correctamente",
          variant: "success",
        });
      }
      setIsPending(false);
      queryClient.invalidateQueries('products')
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al eliminar el producto",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <SheetContent>
      <SheetTitle>Informacion del producto</SheetTitle>
      <ProductEditForm
        product={product}
        setIsPending={setIsPending}
        setIsOpen={setIsOpen}
      />
      <SheetFooter className="mt-2 p-2">
        <Button type="submit" form="update-product-form" disabled={isPending}>
          <Pencil className="mr-2 h-4 w-4" />
          Aplicar
        </Button>
        <Button variant="destructive" onClick={deletedProduct}>
          <X className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
