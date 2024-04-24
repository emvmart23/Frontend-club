import { SheetContent, SheetFooter, SheetTitle } from '@/components/ui/Sheet'
import { useState } from 'react'
import UserEditForm from '../UserEditForm/idnex'
import { Button } from '@/components/ui/Button'
import { Pencil } from 'lucide-react'

interface Props { 
    user: User
    open: boolean
    setIsOpen: (value: boolean) => void
}

export default function UserDetails({ user, setIsOpen }: Props) {
    const [isPending, setIsPending] = useState(false);

  return (
    <SheetContent
    className="w-[400px] sm:min-w-[500px]"
    >
        <SheetTitle>
            Informacion del usuario
        </SheetTitle>
        
        
        <UserEditForm user={user}  setIsPending={setIsPending} setIsOpen={setIsOpen} />
        <SheetFooter>
        <Button
            type="submit"
            form="update-user-form" 
            disabled={isPending}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Aplicar
          </Button>
          <Button
            type="submit"
            form="update-user-form" 
            disabled={isPending}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Aplicar
          </Button>
        </SheetFooter>
    </SheetContent>
  )
}