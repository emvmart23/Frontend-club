import { useQuery } from "react-query";
import NoteSaleDataTable from "../components/NoteSaleDataTable";
import { getHeaders } from "@/helpers/getHeaders";

export default function Boxes() {
  const { data, isLoading } = useQuery("headers", getHeaders);

  const formatHeader = (data ? data.header : []).map((header: Header) => {
    const order = header.orders.find((order) => order);
    return {
      ...header,
      hostess_id:order?.hostess_id,
      total_price: order?.total_price,
      hostess:order?.hostess
    };
  });

  return (
    <section>
      <h1 className="text-3xl font-medium mb-7">Cobranza</h1>
      <NoteSaleDataTable data={formatHeader} isLoading={isLoading} />
    </section>
  );
}