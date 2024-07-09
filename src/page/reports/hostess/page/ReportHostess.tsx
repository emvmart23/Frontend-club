import { useEffect, useState } from "react";
import { getAttendance } from "@/helpers/getAttendance";
import { getHeaders } from "@/helpers/getHeaders";
import { HostessDataTable } from "../components";
import { PDFViewer } from "@react-pdf/renderer";
import { useQuery } from "react-query";
import { format } from "date-fns";
import PdfHostess from "../Pdf";

export default function ReportHostess() {
  const { data, isLoading } = useQuery("hostess", getAttendance);
  const [noteDetails, setNoteDetails] = useState<Header[]>([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");

  // gets salary of hostess
  const currentSale = (
    array: {
      hostess_id: number | undefined;
      total_price: number | undefined;
    }[],
    id: number
  ) =>
    array.reduce((acc, curr) => {
      if (curr.hostess_id === id) {
        acc = acc + Number(curr.total_price);
      }
      return acc;
    }, 0);

  const presentUsers: ReportHostess[] = (data ? data.attendances : [])
    .filter(
      (hostess: Attendace) =>
        !!hostess.present === true &&
        hostess.box_date === currentDate &&
        (hostess.role_user === 4 || hostess.role_user === 8)
    )
    .map((d: Attendace) => {
      const e = currentSale(
        noteDetails
          .filter(
            (note) => note.box_date === currentDate && !!note.state_doc == false
          )
          .map((order) => {
            const orders = order.orders.find((or) => or);
            return {
              hostess_id: orders?.hostess_id,
              total_price: orders?.total_price,
            };
          }),
        d.user_id
      );

      const comission = e * (d.profit_margin / 100);

      return {
        hostess: d.user,
        salary: d.salary,
        hostess_role: d.role_user,
        profit_margin: d.profit_margin,
        currentSale: e,
        comission: comission,
        total: Number(d.salary) + comission,
      };
    });

  const fetchDetailsOfNotes = async () => {
    const { header } = await getHeaders();
    setNoteDetails(header);
  };

  useEffect(() => {
    fetchDetailsOfNotes();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-medium">Reporte de anfitrionas</h1>
      <div>
        <HostessDataTable data={presentUsers} isLoading={isLoading} />
      </div>

      <PDFViewer className="w-full h-screen absolute top-12">
        <PdfHostess data={presentUsers} />
      </PDFViewer>
    </section>
  );
}
