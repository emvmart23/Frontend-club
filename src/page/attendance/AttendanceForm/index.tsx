import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import api from "@/service";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "@/store/slices/user/thunk";
import { Button } from "@/components/ui/Button";

export default function AttendanceForm() {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      user_id: undefined,
      present: false,
      date: format(new Date(), "yyyy-MM-dd' 'HH:mm:ss"),
      date_box: format(new Date(), "yyyy-MM-dd"),
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      const { status } = await api.post("/attendances/create", data);
      if (status == 200) {
        toast({
          description: "Asistencia guardada",
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        description: "Error al registrar",
        variant: "destructive",
      });
    } finally {
      console.log("finish");
    }
  };

  return (
    <form
      id="add-attendance-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-[98%] p-10 border borde-foreground rounded-md shadow-2xl relative"
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-4">
          <label className="font-semibold">Fecha</label>
          <Input disabled {...register("date")} />
        </div>
        <div className="flex justify-center items-center gap-4">
          <label className="font-semibold">Fecha caja</label>
          <Input disabled {...register("date_box")} className="w-32" />
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Asistencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Input
                 disabled
                  {...register('user_id')}
                  defaultValue={user.name}
                />
              </TableCell>
              <TableCell>
                <Input
                 disabled
                  {...register('user_id')}
                  defaultValue={user.user}
                />
              </TableCell>
              <TableCell>
                <div className="w-8 h-8 p-1 mx-auto">
                  <Input
                    className="w-full h-full"
                    type="checkbox"
                    {...register("present")}
                    defaultChecked={user.present}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="right-0 absolute" type="submit">
          guardar
      </Button>
    </form>
  );
}
