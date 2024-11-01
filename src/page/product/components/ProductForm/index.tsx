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
import { useQuery, useQueryClient } from "react-query";
import { ProductSchema } from "@/lib/validators/product";
import { Checkbox } from "@/components/ui/Checkbox";
import { getUnits } from "@/helpers/getUnits";
import { getCategories } from "@/helpers/getCategories";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function ProductForm({ setIsOpen, setIsPending }: Props) {
  const category = useQuery("catefories", getCategories);
  const unit = useQuery("unit", getUnits);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: "",
      category_id: 1,
      unit_id: 1,
      has_alcohol: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.post("/products/create", values);
      if (status == 200) {
        toast({
          description: "Producto creado correctamente",
          variant: "success",
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
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input placeholder="Precio" {...field} />
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
            <FormItem>
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
                  {(category?.data ? category?.data?.category : [])?.map(
                    (category: Category) => (
                      <SelectItem
                        key={category.category_id}
                        value={category.category_id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    )
                  )}
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
                  {(unit ? unit?.data?.unit : [])?.map((unit: UnitMeasure) => (
                    <SelectItem
                      key={unit.unit_id}
                      value={unit.unit_id.toString()}
                    >
                      {unit.abbreviation}
                    </SelectItem>
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
