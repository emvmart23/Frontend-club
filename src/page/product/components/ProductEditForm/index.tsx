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
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Props {
  product: Product;
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function ProductEditForm({ product, setIsOpen }: Props) {
  const category = useSelector((state: RootState) => state.categories.category);
  const units = useSelector((state: RootState) => state.units.unit);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price.toString(),
      category_id: product?.category_id,
      unit_id: product?.unit_id,
      has_alcohol: Boolean(product?.has_alcohol)
    },
  });
  console.log("errors",form.formState.errors)

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    console.log("values",values)
    try {
      const response = await api.patch(
        `/products/update/${product?.id}`,
        values
      );
      console.log(response)
      if (response.status == 200) {
        toast({
          description: "Producto editado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("products");
      setIsOpen(false);
    } catch (error) {
      toast({
        description: "Error al editar producto",
        variant: "destructive",
      });
    } finally {
      console.log("data");
    }
  };

  return (
    <Form {...form}>
      <form
        id="update-product-form"
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
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={product?.category_id.toString()}
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
                  {category.map((category) => (
                    <SelectItem key={category.category_id} value={(category.category_id).toString()}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Unidad de medida</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={product.unit_id.toString()} >
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
                  {units.map((unit) => (
                    <SelectItem key={unit.unit_id} value={(unit.unit_id).toString()}>{unit.abbreviation}</SelectItem>
                  ))}
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
