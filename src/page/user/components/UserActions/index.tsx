import { Button } from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { useState } from 'react';
import UserForm from '../UserForm';
import { Loader2 } from 'lucide-react';

export default function UserActions () {

  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Crear usuario</Button>
      </DialogTrigger>
      <DialogContent className="gap-8">
        <DialogHeader>
          <DialogTitle>Nuevo Usuario</DialogTitle>
          <DialogDescription>
            En este formulario puedes crear un nuevo usuario
          </DialogDescription>
        </DialogHeader>
        <UserForm setIsPending={setIsPending} setIsOpen={setIsOpen}/>
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
            form="add-user-form"
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Agregar
            <span className="sr-only">
              Agregar nuevo usuario
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
