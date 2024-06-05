import { Popover } from "@radix-ui/react-popover";
import { useState } from "react";
import { PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "./Button";
import { cn } from "@/lib/utils/tools";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./Command";
import { ScrollArea } from "./ScrollArea";

export type ComboboxTypeProps = {
  label: string;
  value: string;
};

type ComboboxProps = {
  value: string;
  onSelect: (value: string | undefined) => void;
  items: ComboboxTypeProps[];
  searchPlaceholders?: string;
  noResultsMsg?: string;
  selecItemMsg: string;
  className?: string;
  unSelect?: boolean;
  unSelectMsg?: string;
  onSearchChange?: (e: string) => void;
};

export default function Combobox({
  value,
  onSelect,
  items,
  searchPlaceholders = "Buscar item",
  noResultsMsg = "No se encontro",
  selecItemMsg = "Selecciona un item",
  className,
  unSelect,
  unSelectMsg,
  onSearchChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  //use debounce here
  const handleOnSearchChange = (e: string) => {
    if (e === "") {
      return;
    }

    if (onSearchChange) {
      onSearchChange(e);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : selecItemMsg}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <CommandInput
          placeholder={searchPlaceholders}
          onValueChange={handleOnSearchChange}
        />
        <ScrollArea className="max-h-[220px] overflow-auto">
          <CommandEmpty>{noResultsMsg}</CommandEmpty>
          <CommandGroup>
            {unSelect && (
              <CommandItem>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === "" ? "oapcity-100" : "opacity-0"
                  )}
                />
                {unSelectMsg}
              </CommandItem>
            )}
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={(currentValue) => {
                  onSelect(
                    currentValue === item.label.toLocaleLowerCase()
                      ? item.value
                      : ""
                  );
                  setOpen(false);
                }}
              >
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
