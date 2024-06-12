import { useQuery } from "react-query";
import BoxDataTable from "../components/BoxDataTable";
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
  console.log(formatHeader)
  return (
    <section>
      <h1>Cobranza</h1>
      <BoxDataTable data={formatHeader} isLoading={isLoading} />
    </section>
  );
}
