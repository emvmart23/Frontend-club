import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { getCustomer } from "@/helpers/getCustomer";
import { toast } from "@/hooks/useToast";
import { cn } from "@/lib/utils/tools";
import { NoteScheme } from "@/lib/validators/product";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function FinishSaleForm() {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const form = useForm<z.infer<typeof NoteScheme>>({
    resolver: zodResolver(NoteScheme),
    defaultValues: {
      issue_date: new Date(Date.now()),
      payment_method: "",
      reference: "",
    },
  });

  const fetchCustomer = async () => {
    try {
      const { data } = await getCustomer();
      setCustomer(data.customer);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const onSubmit = async (values: z.infer<typeof NoteScheme>) => {
    try {
      const response = await api.post("/details/create", values);
      if (response.status === 200) {
        toast({
          description: "Venta realizada correctamente",
          variant: "success",
        });
      } else {
        toast({
          description: "Error al realizar venta",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const method_payment = [
    {
      id: 1,
      name: "Efectivo",
    },
    {
      id: 2,
      name: "Tranferencia",
    },
    {
      id: 3,
      name: "Factura a 30 días",
    },
    {
      id: 4,
      name: "A 30 días",
    },
    {
      id: 5,
      name: "Crédito",
    },
    {
      id: 6,
      name: "Tarjeta",
    },
    {
      id: 7,
      name: "Yape",
    },
    {
      id: 8,
      name: "Plin",
    },
  ];

  return (
    <Form {...form}>
      <form className="hidden" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cliente</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue="1"
              >
                <FormControl>
                  <SelectTrigger
                    className={`${
                      !field.value && "text-muted-foreground"
                    } hover:text-accent-foreground`}
                  >
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customer.map((data) => (
                    <SelectItem key={data.id} value={data.id.toString()}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issue_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-20">
          <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Metodo de pago</FormLabel>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        !field.value && "text-muted-foreground"
                      } hover:text-accent-foreground`}
                    >
                      <SelectValue placeholder="Seleccione un metodo de pago" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {method_payment.map((data) => (
                      <SelectItem key={data.id} value={data.name}>
                        {data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Precio total</FormLabel>
                <FormControl>
                  <Input placeholder="Precio total" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Referencia</FormLabel>
                <FormControl>
                  <Input placeholder="Referencia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
