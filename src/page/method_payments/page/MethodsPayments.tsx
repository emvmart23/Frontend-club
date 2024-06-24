import { getMethodPayments } from "@/helpers/getMethodPayments";
import MethodDataTable from "../components/MethodDataTable";
import { useQuery } from "react-query";
import MethodActions from "../components/MethodActions";

export default function MethodsPayments() {
  const { data, isLoading } = useQuery('methods',getMethodPayments)
  return (
    <section className="flex flex-col gap-8 w-full">
        <h1 className="text-3xl">Metodos de pago</h1>
        <div>
          <MethodActions/>
        </div>
        <div>
          <MethodDataTable data={data ? data.data : []} isLoading={isLoading}/>
        </div>
    </section>
  )
}