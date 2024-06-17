import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "./Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils/tools";
import { ChangeEvent, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  onSelect: (value: string) => void;
  selectItemMsg?: string;
  data: Option[];
  tabelValue: string;
  onChange: (value: string) => void;
  heading: string;
}

function Combobox({
  data,
  selectItemMsg,
  tabelValue,
  onChange,
  onSelect,
  heading,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(tabelValue);

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
    onSelect(selectedValue);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
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
          {value
            ? data.find((item) => item.label === value)?.label
            : selectItemMsg}
          <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="h-9"
            value={value}
            onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
          <CommandList>
            <CommandEmpty>No econtrado</CommandEmpty>
            <CommandGroup heading={heading}>
              {data?.map((item) => (
                <CommandItem
                  value={value}
                  key={item.value}
                  onSelect={() => handleSelect(item.label)}
                  onChange={() => onChange(item.label)}
                  className={cn("flex items-center", {
                    "bg-primary-50": item.value === value,
                    "cursor-not-allowed opacity-50": item.value === value,
                  })}
                  disabled={item.label === value}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.label ? "opacity-100" : "opacity-0"
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

export { Combobox };
