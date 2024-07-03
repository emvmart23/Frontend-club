import { getAttendance } from "@/helpers/getAttendance";
import { useQuery } from "react-query";
import { HostessDataTable } from "../components";
import { format } from "date-fns";

export default function ReportHostess() {
  const { data, isLoading } = useQuery("hostess", getAttendance);
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const d = (data ? data.attendances : []).filter((hostess:Attendace) => !!hostess.present === true && hostess.box_date === currentDate)
  console.log(d)
  return (
    <section>
      <h1>Reporte de anfitrionas</h1>
      <div>
        <HostessDataTable data={d} isLoading={isLoading}/>
      </div>
    </section>
  );
}
