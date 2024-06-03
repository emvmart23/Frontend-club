import { useQuery } from "react-query";
import OrdersProcessedDataTable from "../components/OrdersProcessedTable";
import { getHeaders } from "@/helpers/getHeaders";

export default function OrdersProcessed() {
  const { data, isLoading } = useQuery('headersActive', getHeaders)
  console.log(data)
  return (
    <section>
        <h1>Pedidos atendidos</h1>
        <div>
            <OrdersProcessedDataTable data={data ?  data : []} isLoading={isLoading}/>
        </div>
    </section>
  )
}
