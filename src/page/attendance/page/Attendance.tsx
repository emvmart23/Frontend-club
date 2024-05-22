import { getAttendance } from "@/helpers/getAttendance";
import AttendanceActions from "../AttendaceActions";
import AttendanceDataTable from "../AttendaceDataTable";
import { useQuery } from "react-query";

export default function Attendance() {
  const { data, isLoading } = useQuery("Attendance", getAttendance);
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
