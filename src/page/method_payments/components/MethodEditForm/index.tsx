import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/useToast";
import { MethodPaymentsSchema } from "@/lib/validators/method_payments";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  data: MethodPayment
  setIsPending: (value:boolean) => void;
  setIsOpen: (value:boolean) => void;
}
export default function MethodEditForm({ data, setIsPending, setIsOpen }:Props) {
    const form = useForm<z.infer<typeof MethodPaymentsSchema>>({
      resolver: zodResolver(MethodPaymentsSchema),
      defaultValues: {
        name: data?.name
      }
    })
    
    const onSubmit = async (values: z.infer<typeof MethodPaymentsSchema>) => {
      setIsPending(true)
      try {
        const response = await api.patch(`/payments/update/,${data.id}`, values)
        if(response.status === 200){
          toast({
            description: 'Metodo actualizado correctamente',
            variant:'success'
          })
        }
        setIsPending(false)
        setIsOpen(false)
      }catch (error){
        console.log(error)
        toast({
          description: 'Error al actualizar metodo',
          variant: 'destructive'
        })
      }finally{
        setIsPending(false)
      }
    }

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

  )
}
