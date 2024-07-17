import { useQuery } from "react-query";
import { OrdersOfUserDataTable } from "../components/OrdersOfUserDataTable";
import { getHeaders } from "@/helpers/getHeaders";
import { useAuth } from "@/hooks/useAuth";
import useTitle from "@/hooks/useTitle";

export default function OrdersOfUser() {
  const { data, isLoading } = useQuery("headers", getHeaders);
  useTitle("Lista de pedidos")
  const { user } = useAuth();

  const ordersOfCurrentUser: Header[] = (data ? data.header : []).map(
    (header: Header) => {
      const order = header.orders.find((order) => order);
      return {
        ...header,
        hostess: order?.hostess,
      };
    }
  );

  return (
    <section>
      <h1 className="text-3xl font-medium">Lista de pedidos</h1>
      <OrdersOfUserDataTable
        data={ordersOfCurrentUser}
        isLoading={isLoading}
        user={user}
      />
    </section>
  );
}
