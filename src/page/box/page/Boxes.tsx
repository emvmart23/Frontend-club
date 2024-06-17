import { useQuery } from "react-query";
import NoteSaleDataTable from "../components/NoteSaleDataTable";
import { getHeaders } from "@/helpers/getHeaders";

export default function Boxes() {

  const { data, isLoading } = useQuery("orders", getHeaders);
  const formatHeader = (data ? data : []).map((header: Header) => {
    const order = header.orders.find((order) => order);
    return {
      ...header,
      total_price: order?.total_price
    };
  });

  return (
    <section>
      <h1>Cobranza</h1>
      <NoteSaleDataTable data={formatHeader} isLoading={isLoading} />
    </section>
  );
}
