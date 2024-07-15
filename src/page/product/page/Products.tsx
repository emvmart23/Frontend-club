import { useQuery } from "react-query";
import ProductDataTable from "../components/ProductsDataTable";
import ProductActions from "../components/ProductActions";
import { getProducts } from "@/helpers/getProducts";

export default function Products() {
  const { data, isLoading } = useQuery("products", getProducts);

  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-[1.4rem] md:text-3xl font-medium">Productos</h1>
      <ProductActions />
      <ProductDataTable data={data ? data.product : []} isLoading={isLoading} />
    </section>
  );
}
