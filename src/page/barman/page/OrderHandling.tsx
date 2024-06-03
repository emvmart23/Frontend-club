import { getHeaders } from "@/helpers/getHeaders";
import { useQuery } from "react-query";
import { CardDetails } from "../components/index";

export default function OrderHandling() {
  const { data } = useQuery("orders", getHeaders);
  
  const orderActives = (data ? data : []).filter((data: Header) => data.state === 1)

  return (
    <section>
      <h1 className="text-[1.5rem] mb-8">Pedidos</h1>
      <div className="grid grid-cols-4 gap-y-8">
        {orderActives.map((header: Header) => (
            <CardDetails data={header}/>
        ))}
      </div>
    </section>
  );
}
