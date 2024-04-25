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
  import { CategorySchema } from "@/lib/validators/category";
  import api from "@/service";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { useQueryClient } from "react-query";
  import { z } from "zod";
  
  interface Props {
      category:Category;
      setIsPending: (value:boolean) => void;
      setIsOpen: (value:boolean) => void;
  }
  
  export default function CategoryEditForm({setIsPending, setIsOpen, category}: Props) {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof CategorySchema>>({
      resolver: zodResolver(CategorySchema),
      defaultValues: {
        name: category?.name,
      },
    });
  
    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
      setIsPending(true);
      try {
        const { status } = await api.patch(`/categories/update/${category.category_id}`, values);
        if (status == 200) {
          toast({
            description: "Categoria actualizada correctamente",
            variant:"success",
          });
        }
        queryClient.invalidateQueries("Categories");
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
          id="update-categories-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[99%] p-[0.3rem]"
        >
          <div className="flex justify-between gap-4">
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
          </div>
        </form>
      </Form>
    );
  }
  