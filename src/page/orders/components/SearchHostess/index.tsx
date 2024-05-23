import { useQuery } from "react-query";
import { Check, ChevronsUpDown, CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils/tools";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { useState } from "react";
import { getAttendance } from "@/helpers/getAttendance";
import { format } from "date-fns";

export default function SearchHostess() {
  const { data } = useQuery("Attendance", getAttendance);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const hostess = (data ? data.attendances : []).filter(
    ({ box_date, box_state, role_user, present }: Attendace) =>
      box_state === 1 &&
      box_date === currentDate &&
      role_user === 4 &&
      Number(present) === 1
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? hostess.find(({ user }: Attendace) => user == value)?.user
            : "Seleccionar anfitriona..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar anfitrionas..." />
          <CommandEmpty>Anfitriona no encontrada</CommandEmpty>
          <CommandGroup>
            {hostess.length > 0 ? (
              hostess.map(({ id, user }: Attendace) => (
                <CommandItem
                  key={id}
                  value={user}
                  onSelect={() => {
                    setValue(user);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user}
                </CommandItem>
              ))
            ) : (
              <CommandItem className="font-semibold">
                <CircleAlert className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                No hay anfitrionas
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}