import { getHeaders } from "@/helpers/getHeaders";
import { useQuery } from "react-query";
import { CardDetails } from "../components/index";
import useTitle from "@/hooks/useTitle";

export default function OrderHandling() {
  const { data } = useQuery("orders", getHeaders);
  useTitle("Pedidos")
  
  const orderActives = (data ? data.header : [])?.filter(
    (data: Header) => data.state === 1 && data.state_doc !== null
  );

  return (
    <section>
      <h1 className="text-[1.5rem] mb-8">Pedidos</h1>
      <div className="grid grid-cols-4 gap-y-8">
        {orderActives?.map((header: Header, index:number) => (
          <CardDetails key={index} data={header} />
        ))}
      </div>
    </section>
  );
}
