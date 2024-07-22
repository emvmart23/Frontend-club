import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/useToast";
import { MethodPaymentsSchema } from "@/lib/validators/method_payments";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function MethodForm({ setIsPending, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof MethodPaymentsSchema>>({
    resolver: zodResolver(MethodPaymentsSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof MethodPaymentsSchema>) => {
    setIsPending(true);
    console.log("data", values)
    try {
      const response = await api.post("/payments/create", values);
      if (response.status === 200) {
        toast({
          description: "Método de pago creado correctamente",
          variant: "success",
        });
        queryClient.invalidateQueries("methods");
      } else {
        toast({
          description: "Error al crear el método de pago",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al crear el método de pago",
        variant: "destructive",
      });
    } finally {
      setIsOpen(false);
      setIsPending(false)
    }
  };

  return (
    <Form {...form}>
      <form id="add-customers-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
