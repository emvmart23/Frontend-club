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
import { Skeleton } from "@/components/ui/Skeleton";

interface Props {
  setIsOpen: (value: boolean) => void;
}

export default function AttendanceForm({ setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [users, setUsers] = useState<Attendace[]>([]);
  const [textShadow, setTextShadow] = useState<User[]>([]);
  const [allAttendances, setAllAttendances] = useState<Attendace[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const fetchData = async () => {
      try {
        const allUsers = await getUsersWithOutRedux();
        setTextShadow(allUsers.map((user: User) => user.name));

        const { data } = await api.get("/attendances");
        setAllAttendances(data.attendances);

        const isPresent = data.attendances.filter(
          (attendance: Attendace) => attendance.date === currentDate
        );
        const isAttendancePresent = (index: number) =>
          isPresent[index] ? isPresent[index].present : false;

        setUsers(
          allUsers.map((u: Attendace, index: number) => {
            return {
              user_id: u.id,
              present: isAttendancePresent(index),
              date: currentDate,
            };
          })
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [currentDate]);

  const isDateExist = allAttendances.some(
    (attendance) => attendance.box_date === currentDate
  );

  const handleCheckOnChange = (index: number) => {
    users[index].present = !users[index].present;
    setUsers([...users]);
  };

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
        setIsOpen(false);
      } catch (error) {
        console.log(error);
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
          queryClient.invalidateQueries("Attendance");
        } else {
          toast({
            description: "Asistencia guardada",
            variant: "success",
          });
        }
        setIsOpen(false);
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          toast({
            description: "La caja anterior debe ser cerrada",
            variant: "destructive",
          });
        } else {
          toast({
            description: "Error al registrar",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <form
      id="add-attendance-form"
      onSubmit={onSubmit}
      className="space-y-5 flex-col flex w-full p-8 border border-foreground rounded-md shadow-2xl overflow-auto"
    >
      {isPending ? (
        <Skeleton className="h-[326px] w-[34.5rem]" />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-4">
              <label className="font-semibold">Fecha</label>
              <Input
                readOnly
                placeholder={format(new Date(), "yyyy-MM-dd' 'HH:mm:ss")}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <label className="font-semibold">Fecha caja</label>
              <Input
                className="w-32"
                placeholder={format(new Date(), "yyyy-MM-dd")}
              />
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
                    <span className="text-[1rem] font-medium">
                      {textShadow[index].toString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-8 h-8 p-1 ml-4">
                      <Input
                        className="w-full h-full"
                        type="checkbox"
                        onChange={() => handleCheckOnChange(index)}
                        value={user.present ? "on" : "off"}
                        checked={user.present ? true : false}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      {isDateExist ? (
        <Button className="" type="submit">
          Editar
        </Button>
      ) : (
        <Button className="" type="submit">
          Guardar
        </Button>
      )}
    </form>
  );
}
