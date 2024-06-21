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
import { getMethodPayments } from "@/helpers/getMethodPayments";
import { toast } from "@/hooks/useToast";
import { cn } from "@/lib/utils/tools";
import { NoteScheme } from "@/lib/validators/product";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
  setPaymentFields: (value: PaymentField[]) => void;
  ordersDetails: Orders | undefined;
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleForm({
  ordersDetails,
  setIsOpen,
  setPaymentFields,
  header,
}: Props) {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [methodPayments, setMethodPayments] = useState<MethodPayment[]>([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof NoteScheme>>({
    resolver: zodResolver(NoteScheme),
    defaultValues: {
      issue_date: currentDate,
      total_price: Number(ordersDetails?.total_price),
      payment: [
        {
          mountain: Number(ordersDetails?.total_price),
          reference: "todo bien",
        },
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof NoteScheme>) => {
    setIsOpen(true);
    try {
      const response = await api.post(`/details/creat/${header.id}`, values);
      if (response.status === 200) {
        toast({
          description: "Venta realizada correctamente",
          variant: "success",
        });
        queryClient.invalidateQueries("headers");
        setIsOpen(false);
      } else {
        toast({
          description: "Error al realizar venta",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        description: "Error al realizar venta",
        variant: "destructive",
      });
    } finally {
      setIsOpen(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "payment",
    control: form.control,
  });

  const fetchMethosPayments = async () => {
    try {
      const { data } = await getMethodPayments();
      setMethodPayments(data); 
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    fetchMethosPayments();
  }, []);

  useEffect(() => {
    setPaymentFields(fields);
  }, [fields, setPaymentFields]);

  return (
    <Form {...form}>
      <form id="finish-sale-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-[60%] space-y-4">
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        !field.value && "text-muted-foreground"
                      } hover:text-accent-foreground`}
                    >
                      <SelectValue placeholder="Seleccione un cliente" />
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
              <FormItem className="w-full flex flex-col">
                <FormLabel>Fecha de emisión</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
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
          <FormField
            control={form.control}
            name="total_price"
            render={({ field }) => (
              <FormItem className="w-full hidden">
                <FormControl>
                  <Input placeholder="referencia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="overflow-auto h-40 mt-4">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="pl-[0.5rem]">Metodo de pago</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Referencia</TableHead>
                <TableHead>
                  <Button
                    type="button"
                    className="border-none space-x-1 underline-offset-4"
                    variant={"outline"}
                    onClick={() =>
                      append({
                        payment_method: "ingresa",
                        mountain: 10,
                        reference: "ok",
                      })
                    }
                  >
                    <span>Agregar</span>
                    <Plus className="w-4 h-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell className="pl-[0.3rem]">
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
                              {methodPayments?.map((data) => (
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
                      name={`payment.${index}.reference`}
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
                    <Button
                      form="finish-sale-form"
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
        </div>
        <Button
          form="finish-sale-form"
          type="submit"
          className="absolute right-8 bottom-6"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
}
