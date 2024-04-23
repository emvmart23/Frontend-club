import { DropdownMenuTrigger, DropdownMenu, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent, DropdownMenuSeparator } from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'
import { User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/auth'

export default function UserDropDown() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=' w-10 h-10 rounded-full'> 
            <User className='w-full h-full'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
            <span>Salir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>      
    </DropdownMenu>
  )
}
