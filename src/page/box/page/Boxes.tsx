import { useQuery } from "react-query";
import NoteSaleDataTable from "../components/NoteSaleDataTable";
import { getHeaders } from "@/helpers/getHeaders";
import { PDFViewer } from "@react-pdf/renderer";
import PDF from "../Pdf/PdfNotes";

export default function Boxes() {

  const { data, isLoading } = useQuery("headers", getHeaders);

  const formatHeader = (data ? data : []).map((header: Header) => {
    const order = header.orders.find((order) => order);
    return {
      ...header,
      total_price: order?.total_price,
      hostess:order?.hostess
    };
  });
  console.log("dsds", formatHeader)
  return (
    <section>
      <h1 className="mb-4">Cobranza</h1>
      <NoteSaleDataTable data={formatHeader} isLoading={isLoading} />
    </section>
  );
}
