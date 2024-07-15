import { useQuery } from "react-query";
import { OrdersOfUserDataTable } from "../components/OrdersOfUserDataTable";
import { getHeaders } from "@/helpers/getHeaders";
import { useAuth } from "@/hooks/useAuth";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { format } from "date-fns";
import { getValueOfColumnsFilter } from "@/lib/utils/getValueOfColumnFilters";

export default function OrdersOfUser() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, isLoading } = useQuery("headers", getHeaders);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const { user } = useAuth();

  const ordersOfCurrentUser: Header[] = (data ? data.header : [])
    ?.filter(
      (header: Header) =>
        header.current_user === user?.id &&
        header.box_date ===
          (getValueOfColumnsFilter(columnFilters, "box_date") ?? currentDate)
    )
    .map((header: Header) => {
      const order = header.orders.find((order) => order);
      return {
        ...header,
        hostess: order?.hostess,
      };
    });

  return (
    <section>
      <h1 className="text-3xl font-medium">Lista de pedidos</h1>
      <OrdersOfUserDataTable
        data={ordersOfCurrentUser}
        isLoading={isLoading}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </section>
  );
}
