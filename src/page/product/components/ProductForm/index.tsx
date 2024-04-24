import { Input } from "@/components/ui/Input";
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
import api from "@/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useQueryClient } from "react-query";
import { ProductSchema } from "@/lib/validators/product";
import { Checkbox } from "@/components/ui/Checkbox";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function ProductForm({ setIsOpen, setIsPending }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      category_id: 1,
      unit_id: 1,
      has_alcohol: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.post("/products/create", values);
      //no sale
      if (status >= 400) {
        toast({
          description: "Producto creado correctamente",
        });
      }
      queryClient.invalidateQueries("products");
      setIsOpen(false);
    } catch (error) {
      toast({
        description: "Error al crear Producto",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="add-product-form"
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
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Categoria</FormLabel>
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
                      <SelectValue placeholder="Seleccione una categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Cerveza</SelectItem>
                    <SelectItem value="2">Whisky</SelectItem>
                    <SelectItem value="3">Vodka</SelectItem>
                    <SelectItem value="4">Ron</SelectItem>
                    <SelectItem value="4">Pisco</SelectItem>
                    <SelectItem value="4">Otros</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Unidad de medida</FormLabel>
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
                  <SelectItem value="1">Unidad</SelectItem>
                  <SelectItem value="2">Botella</SelectItem>
                  <SelectItem value="3">Copa</SelectItem>
                  <SelectItem value="4">Vaso</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="has_alcohol"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>con alcohol</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
