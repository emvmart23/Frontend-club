import { Input } from "@/components/ui/Input";
import { UserSchema } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { toast } from "@/hooks/useToast";
import { InputPassword } from "@/components/InputPassword";
import api from "@/service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useQueryClient } from "react-query";

interface Props {
  setIsPending: (value: boolean) => void
  setIsOpen: (value: boolean) => void
}

export default function UserForm({ setIsPending, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      user: "",
      password: "",
      password_confirmation: "",
      role_id: 1
    },
});

 const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    setIsPending(true)
    try {
      const { status } = await api.post("/auth/register", values)
      //no sale
       if(status == 200) {
        // color verde
        toast({
            description: "Cuenta creada correctamente",
            variant: "success"
          })
       }
       queryClient.invalidateQueries("users");
       setIsOpen(false)
    } catch (error) {
      //amarillo or naranja
      toast({
        description: "Error al crear cuenta",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  };

  return (
      <Form {...form}>
        <form id="add-user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[99%] p-[0.3rem]">
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
                    defaultValue="1"
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
                      <SelectItem value="1">Admin</SelectItem>
                      <SelectItem value="2">Cajero</SelectItem>
                      <SelectItem value="3">Mozo</SelectItem>
                      <SelectItem value="4">Barman</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
            )}
            />
          <InputPassword form={form} name={"password_confirmation"} />
          <InputPassword form={form} name={"password"} placeholder="Confirmar contraseña" />
        </form>
      </Form>
  );
}