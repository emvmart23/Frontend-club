import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Button } from './Button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './Command';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils/tools';

interface Option {
  value:string;
  label: string;
}

interface Props {
  selectItemMsg?:string;
  data: Option[]
  onSelect: ( selectedValue: string ) => void
}

function Combobox({ data, onSelect, selectItemMsg } : Props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const handleSelect = (selectedValue: string) => {
        setValue(selectedValue);
        setOpen(false);
        onSelect(selectedValue);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
              >
                  {value ? data.find((item) => item.value === value)?.label : selectItemMsg}
                  <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
              <Command>
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList
                  >
                      <CommandEmpty>No item found.</CommandEmpty>
                      <CommandGroup heading="Options">
                          {data?.map((item) => (
                              <CommandItem
                                  key={item.value}
                                  onSelect={() => handleSelect(item.value)}
                                  className={cn("flex items-center", {
                                      "bg-primary-50": item.value === value,
                                      "cursor-not-allowed opacity-50": item.value === value,
                                  })}
                                  disabled={item.value === value}
                              >
                                  {item.label}
                                  <CheckIcon
                                      className={cn(
                                          "ml-auto h-4 w-4",
                                          value === item.value ? "opacity-100" : "opacity-0"
                                      )}
                                  />
                              </CommandItem>
                          ))}
                      </CommandGroup>
                  </CommandList>
              </Command>
          </PopoverContent>
      </Popover>
  );
}

export {
   Combobox
}
