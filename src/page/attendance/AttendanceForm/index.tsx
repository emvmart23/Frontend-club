import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import { AttendaceSchema } from "@/lib/validators/attendance";
import { Checkbox } from "@/components/ui/Checkbox";
import api from "@/service";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { getUsers } from "@/store/slices/user/thunk";

export default function AttendanceForm() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(users);
  const name = users.map((dat) => dat.name)
  const form = useForm<z.infer<typeof AttendaceSchema>>({
    resolver: zodResolver(AttendaceSchema),
    defaultValues: {
      user_id: undefined,
      present: false,
      late: false,
      absent: false,
      date: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof AttendaceSchema>) => {
    try {
      const { status } = await api.post("/attendance/create", values);
      if (status == 200) {
        toast({
          description: "Asistencia guardada",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("users");
    } catch (error) {
      toast({
        description: "Error al crear cuenta",
        variant: "destructive",
      });
    } finally {
      console.log("finsh");
    }
  };

  return (
    <Form {...form}>
      <form
        id="add-attendance-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        {users?.map((user) => (
          <div key={user.id} className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={name[user.id]} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
            </div>
          </div>
        ))}
      </form>
    </Form>
  );
}
