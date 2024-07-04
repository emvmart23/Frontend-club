import { getAttendance } from "@/helpers/getAttendance";
import { useQuery } from "react-query";
import { HostessDataTable } from "../components";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getDetails } from "@/helpers/getDetails";

export default function ReportHostess() {
  const { data, isLoading } = useQuery("hostess", getAttendance);
  const [orderDetails, setOrderDetails] = useState<Detail[]>([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  
  const d = (data ? data.attendances : []).filter(
    (hostess: Attendace) =>
      !!hostess.present === true && hostess.box_date === currentDate
  );

  const fetchDetailsOfOrders = async () => {
    const { details } = await getDetails();
    setOrderDetails(details);
  };

  useEffect(() => {
    fetchDetailsOfOrders();
  }, []);
  console.log(orderDetails)
  return (
    <section>
      <h1>Reporte de anfitrionas</h1>
      <div className="hidden">
        <HostessDataTable data={d} isLoading={isLoading} />
      </div>
    </section>
  );
}
