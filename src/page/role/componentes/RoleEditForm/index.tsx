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

import { RoleSchema } from "@/lib/validators/role";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
  role: Role;
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function CategoryEditForm({
  setIsPending,
  setIsOpen,
  role,
}: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof RoleSchema>>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      role_name: role?.role_name,
    },
  });

  const onSubmit = async (values: z.infer<typeof RoleSchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.patch(
        `/roles/update/${role.role_id}`,
        values
      );
      if (status == 200) {
        toast({
          description: "Rol actualizado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("roles");
      setIsOpen(false);
    } catch (error) {
      toast({
        description: "Error al editar Rol",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="update-roles-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="role_name"
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
        </div>
      </form>
    </Form>
  );
}
