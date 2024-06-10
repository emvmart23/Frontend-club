// import { useState } from "react";
// import { Popover, PopoverTrigger } from "./Popover";
// import { Button } from "./Button";
// import { cn } from "@/lib/utils/tools";
// import { CalendarIcon } from "lucide-react";
// import { PopoverContent } from "@radix-ui/react-popover";
// import { format } from "date-fns";
// import { Calendar } from "./Calendar";

// interface Props {
//   onSelect: (value: string) => void;
// }

// export default function DatePicker({ onSelect }: Props) {
//   const [date, setDate] = useState<Date>();

//   const handleSelect = (selectedValue: string) => {
//     onSelect(selectedValue)
//   }

//   const dateString = '2023-06-11';
//   console.log(format(dateString,"yyyy-MM-dd"))

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "yyyy-MM-dd") : <span>Filtra por fecha</span>}
//         </Button>
//         <PopoverContent>
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={() => handleSelect("")}
//             initialFocus
//           />
//         </PopoverContent>
//       </PopoverTrigger>
//     </Popover>
//   );
// }
