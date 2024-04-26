import api from "@/service";
import { useQuery } from "react-query";
import CustomerActions from "../components/CustomerActions";
import CustomerDataTable from "../components/CustomerDataTable";

const getCustomers = async () => {
    const { data } = await api.get("/customers");
    return data;
} 

export default function Customers() {
  const { data, isLoading } = useQuery("customers", getCustomers)

  return (
    <section className="flex flex-col gap-8 w-full">
        <h3 className="text-3xl">Clientes</h3>
        <div>
          <CustomerActions />
        </div>
        <CustomerDataTable data={data ? data.customer : []} isLoading={isLoading} />
    </section>
  )
}