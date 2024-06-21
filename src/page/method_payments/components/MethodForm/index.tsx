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
import { z } from "zod";

export default function MethodForm() {
  const form = useForm<z.infer<typeof MethodPaymentsSchema>>({
    resolver: zodResolver(MethodPaymentsSchema),
  });

  const onSubmit = async (values: z.infer<typeof MethodPaymentsSchema>) => {
    try {
      const response = await api.post("/payments/create", values);

      if (response.status === 200) {
        toast({
          description: "Método de pago creado correctamente",
          variant: "success",
        });
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
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
