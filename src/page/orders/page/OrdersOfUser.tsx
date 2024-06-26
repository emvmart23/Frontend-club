import { useQuery } from "react-query";
import { OrdersOfUserDataTable } from "../components/OrdersOfUserDataTable";
import { getHeaders } from "@/helpers/getHeaders";
import { useAuth } from "@/hooks/useAuth";

export default function OrdersOfUser() {
  const { data, isLoading } = useQuery("headers", getHeaders);
  //inserta el id del usuario en cabcera para que puedas hacer la condicion
  const { user } = useAuth();
  const currentUser = (data ? data : []).filter((u: User) => u.id);
  return (
    <section>
      <h1 className="">Lista de pedidos</h1>
      <div>
        <OrdersOfUserDataTable data={currentUser} isLoading={isLoading} />
      </div>
    </section>
  );
}
