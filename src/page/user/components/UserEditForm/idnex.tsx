import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { toast } from "@/hooks/useToast";
import { MainSchema } from "@/lib/validators/user";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
    setIsPending: (value:boolean) => void;
    setIsOpen: (value:boolean) => void;
    user: User;
}

export default function UserEditForm({setIsOpen, setIsPending, user}: Props) {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof MainSchema>>({
        resolver: zodResolver(MainSchema),
        defaultValues: {
          name: user?.name,
          user: user?.user,
          role_id: user?.role_id,
        },
    });
    
    const onSubmit = async (values: z.infer<typeof MainSchema>) => {
        setIsPending(true)
        try {
          const { status } = await api.patch(`/users/update/${user?.id}`, values)
           if(status == 200) {
            toast({
                description: "Cuenta editada correctamente",
                variant: "success"
              })
           }
           queryClient.invalidateQueries("users");
           setIsOpen(false)
        } catch (error) {
          toast({
            description: "Error al editar cuenta",
            variant: "destructive",
          })
        } finally {
          setIsPending(false)
        }
      };
  return (
    <Form {...form}>
    <form id="update-user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[99%] p-[0.3rem]">
      <div className="flex justify-between gap-4">
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
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tipo de rol</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={user?.role_id.toString()}
              >
                <FormControl>
                  <SelectTrigger
                    className={`${!field.value && "text-muted-foreground"
                      } hover:text-accent-foreground`}
                  >
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2">Admin</SelectItem>
                  <SelectItem value="3">Cajero</SelectItem>
                  <SelectItem value="4">Mozo</SelectItem>
                  <SelectItem value="5">Barman</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
        )}
        />
    </form>
  </Form>
  )
}
