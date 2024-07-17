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
import { UnitSchema } from "@/lib/validators/unit_measure";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
  unit: UnitMeasure;
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function UnitEditForm({ setIsPending, setIsOpen, unit }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UnitSchema>>({
    resolver: zodResolver(UnitSchema),
    defaultValues: {
      abbreviation: unit.abbreviation,
      description: unit.description,
    }
  });

  const onSubmit = async (values: z.infer<typeof UnitSchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.patch(
        `unit_measures/update/${unit.unit_id}`,
        values
      );
      if (status == 200) {
        toast({
          description: "Unidad actualizado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("units");
      setIsOpen(false);
    } catch (error) {
      toast({
        description: "Error al editar unidad",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="update-units-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="abbreviation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Abreviacion</FormLabel>
                <FormControl>
                  <Input placeholder="Abreviacion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input placeholder="Descripcion" {...field} />
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
