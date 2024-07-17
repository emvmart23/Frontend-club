import { getMethodPayments } from "@/helpers/getMethodPayments";
import MethodDataTable from "../components/MethodDataTable";
import { useQuery } from "react-query";
import MethodActions from "../components/MethodActions";
import useTitle from "@/hooks/useTitle";

export default function MethodsPayments() {
  const { data, isLoading } = useQuery("methods", getMethodPayments);
  useTitle("Metodos de pago")

  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-3xl">Metodos de pago</h1>
      <MethodActions />
      <MethodDataTable data={data ? data.data : []} isLoading={isLoading} />
    </section>
  );
}
