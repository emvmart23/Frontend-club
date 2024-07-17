import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useState } from "react";
import UnitForm from "../UnitForm";
import { Loader2 } from "lucide-react";

export default function UnitActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Crear Unidad</Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Nueva Unidad</DialogTitle>
          <DialogDescription>
            En este formulario puedes crear una nueva unidad
          </DialogDescription>
        </DialogHeader>
        <UnitForm setIsPending={setIsPending} setIsOpen={setIsOpen} />
        <DialogFooter className="flex sm:justify-between gap-4">
          <DialogClose asChild>
            <Button className="w-full" variant="outline">
              Cerrar
            </Button>
          </DialogClose>
          <Button
            className="w-full"
            disabled={isPending}
            type="submit"
            form="add-units-form"
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
