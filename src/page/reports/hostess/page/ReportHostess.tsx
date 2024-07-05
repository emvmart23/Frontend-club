import { getAttendance } from "@/helpers/getAttendance";
import { useQuery } from "react-query";
import { HostessDataTable } from "../components";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getDetailsOfNoteSale } from "@/helpers/getDetailsOfNoteSale";

export default function ReportHostess() {
  const { data, isLoading } = useQuery("hostess", getAttendance);
  const [noteDetails, setNoteDetails] = useState<Detail[]>([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");

  // const currentSale = (id: number, array: Detail[]) =>
  //   array.reduce((acc, curr) => {
  //     if (curr.hostess_id === id) {
  //       acc = acc + Number(curr.total_price);
  //     }
  //     return acc;
  //   }, 0);

  // gets salary of hostess
  const currentSale = (id: number, array: Detail[]) =>
    array.reduce((acc, curr) => {
      if (curr.hostess_id === id) {
        acc = acc + Number(curr.total_price);
      }
      return acc;
    }, 0);

  const presentUsers = (data ? data.attendances : [])
    .filter(
      (hostess: Attendace) =>
        !!hostess.present === true && hostess.box_date === currentDate
    )
    .map((d: Attendace) => {
      // salary of hostess
      const e = currentSale(d.user_id, noteDetails);
      return {
        hostess: d.user,
        present: d.present,
        salary: d.salary,
        profit_margin: d.profit_margin,
        currentSale: e,
        // comission: e * d.profit_margin
      };
    });
  console.log(presentUsers);
  const fetchDetailsOfNotes = async () => {
    const { details } = await getDetailsOfNoteSale();
    setNoteDetails(details);
  };

  useEffect(() => {
    fetchDetailsOfNotes();
  }, []);

  return (
    <section>
      <h1>Reporte de anfitrionas</h1>
      <div className="hidden">
        <HostessDataTable data={[]} isLoading={isLoading} />
      </div>
    </section>
  );
}
