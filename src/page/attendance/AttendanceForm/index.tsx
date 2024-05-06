import { FormEvent, useState } from "react";
import { toast } from "@/hooks/useToast";
import api from "@/service";
import { format } from "date-fns";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useEffect } from "react";
import { getUsersWithOutRedux } from "@/store/slices/user/thunk";
import { Button } from "@/components/ui/Button";
import { useQueryClient } from "react-query";

export default function AttendanceForm() {
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<Attendace[]>([]);
  const [textShadow, setTextShadow] = useState<User[]>([]);
  const [allAttendances, setAllAttendances] = useState<Attendace[]>([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");

  const fetchUsers = async () => {
    const allUsers = await getUsersWithOutRedux();
    setTextShadow(allUsers.map((user: User) => user.name));
    const { data } = await api.get("/attendances");
    setAllAttendances(data.attendances);
    setUsers(
      allUsers.map((u: Attendace) => {
        return {
          user_id: u.id,
          present: false,
          date: format(new Date(), "yyyy-MM-dd' 'HH:mm:ss"),
          date_box: format(new Date(), "yyyy-MM-dd"),
        };
      })
    );
  };

  const isDateExist = allAttendances.some(
    (attendance) => attendance.date === currentDate
  );
  console.log('isDateExist',isDateExist)
  const isPresent =  allAttendances.map(attendance => Boolean(attendance.present))

  const handleCheckOnChange = (index: number) => {
    users[index].present = !users[index].present;
    setUsers([...users]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isDateExist) {
      try {
        const { status } = await api.patch("/attendances/update", users);
        if (status == 200) {
          toast({
            description: "Asistencia actualizada",
            variant: "success",
          });
        }
        queryClient.invalidateQueries("Attendance");
      } catch (error) {
        toast({
          description: "Error al actualizar",
          variant: "destructive",
        });
      }
    } else {
      try {
        const { status } = await api.post("/attendances/create", users);
        if (status == 201) {
          toast({
            description: "Asistencia guardada",
            variant: "success",
          });
        }
        queryClient.invalidateQueries("Attendance");
      } catch (error) {
        toast({
          description: "Error al registrar",
          variant: "destructive",
        });
      }
    }
  };


  return (
    <form
      id="add-attendance-form"
      onSubmit={onSubmit}
      className="space-y-5 w-[98%] p-10 border borde-foreground rounded-md shadow-2xl relative"
    >
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-4">
          <label className="font-semibold">Fecha</label>
          <Input />
        </div>
        <div className="flex justify-center items-center gap-4">
          <label className="font-semibold">Fecha caja</label>
          <Input className="w-32" />
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Asistencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.user_id}>
              <TableCell className="relative">
                <Input
                  readOnly
                  type="text"
                  value={user.user_id}
                  className="transparent text-shadow hidden"
                />
                <span className="absolute top-[30%]">
                  {textShadow[index].toString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="w-8 h-8 p-1 ml-4">
                  <Input
                    className="w-full h-full"
                    type="checkbox"
                    defaultChecked={isPresent[index] ? true : false}
                    onChange={() => handleCheckOnChange(index)}
                    value={user.present ? "on" : "off"}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDateExist ? (
        <Button className="right-0 absolute" type="submit">
          Editar
        </Button>
      ) : (
        <Button className="right-0 absolute" type="submit">
          Guardar
        </Button>
      )}
    </form>
  );
}
