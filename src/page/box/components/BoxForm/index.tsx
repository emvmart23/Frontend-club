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
import { useQueryClient } from "react-query";
import { BoxSchema } from "@/lib/validators/box";
import api from "@/service";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

const getBoxes = async () => {
  try {
    const { data } = await api.get("/boxes");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function BoxForm({ setIsPending, setIsOpen }: Props) {
  const [allBoxes, setAllBoxes] = useState<Box[]>([])
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof BoxSchema>>({
    resolver: zodResolver(BoxSchema),
    defaultValues: {
      user_opening: user?.user,
      user_closing: user?.user,
      closing: currentDate,
      final_balance: "100.00",
      opening: currentDate,
      state: true,
      initial_balance: undefined,
    },
  });

  const fetchBoxes = async () => {
    const data = await getBoxes();
    setAllBoxes(data.boxes)
  }

  const boxIsClosed = allBoxes.find((box) => box.opening === currentDate);
  console.log(boxIsClosed?.state)
  const onSubmit = async (values: z.infer<typeof BoxSchema>) => {
    if (boxIsClosed?.state) {
      toast({
        description: "No puedes abrir caja cierra la caja actual para aperturar ",
        variant: "destructive",
      });
    } else {
      setIsPending(true);
      try {
        const { status } = await api.post("/boxes/create", values);
        if (status == 200) {
          toast({
            description: "Caja aperturada",
            variant: "success",
          });
        }
        queryClient.invalidateQueries("box");
        setIsOpen(false);
      } catch (error) {
        toast({
          description: "Error al crear cuenta",
          variant: "destructive",
        });
      } finally {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  return (
    <Form {...form}>
      <form
        id="box-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="user_opening"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input readOnly placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initial_balance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Saldo inicial</FormLabel>
                <FormControl>
                  <Input placeholder="Saldo inicial" {...field} />
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
