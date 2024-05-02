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
  import { CustomerSchema } from "@/lib/validators/customer";
  import api from "@/service";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { useQueryClient } from "react-query";
  import { z } from "zod";
  
  interface Props {
      customer:Customer;
      setIsPending: (value:boolean) => void;
      setIsOpen: (value:boolean) => void;
  }
  
  export default function CategoryEditForm({setIsPending, setIsOpen, customer}: Props) {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof CustomerSchema>>({
      resolver: zodResolver(CustomerSchema),
      defaultValues: {
        name: customer?.name,
        dni: customer?.dni,
      },
    });
  
    const onSubmit = async (values: z.infer<typeof CustomerSchema>) => {
      setIsPending(true);
      try {
        const { status } = await api.patch(`/customers/update/${customer.id}`, values);
        if (status == 200) {
          toast({
            description: "Cliente actualizado correctamente",
            variant:"success",
          });
        }
        queryClient.invalidateQueries("customers");
        setIsOpen(false);
      } catch (error) {
        toast({
          description: "Error al editar Categoria",
          variant: "destructive",
        });
      } finally {
        setIsPending(false);
      }
    };

    return (
      <Form {...form}>
        <form
          id="update-customers-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[99%] p-[0.3rem]"
        >
          <div className="flex flex-col justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Dni</FormLabel>
                  <FormControl>
                    <Input placeholder="dni" {...field} />
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
  