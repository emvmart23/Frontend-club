import AttendanceActions from "../AttendaceActions";
import api from "@/service";
import AttendanceDataTable from "../AttendaceDataTable";
import { useQuery } from "react-query";

const getAttendance = async () => {
  const { data } = await api.get("/attendances");
  return data;
};

export default function Attendance() {
  const { data, isLoading } = useQuery("Attendance", getAttendance);
  console.log(data.attendances)
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Asistencias</h3>
      <div>
        <AttendanceActions />
      </div>
      <div className="flex gap-4">
        <AttendanceDataTable
          data={data ? data.attendances : []}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
