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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { getCustomer } from "@/helpers/getCustomer";
import { toast } from "@/hooks/useToast";
import { cn } from "@/lib/utils/tools";
import { NoteScheme } from "@/lib/validators/product";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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

interface Props {
  header: Header;
  setIsOpen: (value: boolean) => void;
}

export default function FinishSaleForm({ header, setIsOpen }: Props) {
  const [customer, setCustomer] = useState<Customer[]>([]);

  const ordersDetails = header?.orders.find((order) => order);

  const form = useForm<z.infer<typeof NoteScheme>>({
    resolver: zodResolver(NoteScheme),
    defaultValues: {
      client_id: 1,
      issue_date: new Date(Date.now()),
      payment: [
        {
          payment_method: "e",
          mountain: 20,
          total_price: ordersDetails?.total_price,
          reference: "e",
        },
      ],
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
    setIsOpen(true);
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
    } finally {
      setIsOpen(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "payment",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form className="fixed" onSubmit={form.handleSubmit(onSubmit)}>
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
                        <span>Seleccione una foto</span>
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metodo de pago</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Referencia</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`payment.${index}.payment_method`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
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
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`payment.${index}.mountain`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`payment.${index}.total_price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`payment.${index}.reference`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="referencia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    className={`${index == 0 && "invisible"}`}
                    variant={"outline"}
                    onClick={() => remove(index)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className="mt-6"
          variant={"outline"}
          onClick={() =>
            append({
              payment_method: "ingresa",
              mountain: 10,
              total_price: 10,
              reference: "ingresa",
            })
          }
        >
          Agregar
        </Button>
      </form>
    </Form>
  );
}
