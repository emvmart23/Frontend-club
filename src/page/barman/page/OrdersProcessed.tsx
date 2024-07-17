import { useQuery } from "react-query";
import OrdersProcessedDataTable from "../components/OrdersProcessedTable";
import { getHeaders } from "@/helpers/getHeaders";
import useTitle from "@/hooks/useTitle";

export default function OrdersProcessed() {
  const { data, isLoading } = useQuery("orders", getHeaders);
  useTitle("Pedidos atendidos")
  const dataHeaders = (data ? data.header : []).filter(
    (head: Header) => head.state_doc !== null
  );

  const format = dataHeaders?.map((item: Header) => {
    const order = item.orders?.find((order) => order);
    return {
      ...item,
      hostess_id: order?.hostess_id,
      hostess: order?.hostess,
    };
  });

  return (
    <section>
      <h1 className="text-3xl font-medium mb-7">Pedidos atendidos</h1>
      <OrdersProcessedDataTable data={format} isLoading={isLoading} />
    </section>
  );
}
