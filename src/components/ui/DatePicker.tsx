import { Popover, PopoverTrigger } from "./Popover";
import { Button } from "./Button";
import { cn } from "@/lib/utils/tools";
import { CalendarIcon } from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "./Calendar";

interface Props {
  date: Date | undefined;
  onSelect: (value: Date) => void;
}

export default function DatePicker({ onSelect, date }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy-MM-dd") : <span>Filtra por fecha</span>}
        </Button>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={() => onSelect}
            initialFocus
          />
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
}
