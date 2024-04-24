import api from "@/service";
import { useQuery } from "react-query";
import ProductDataTable from "../components/ProductsDataTable";
import ProductActions from "../components/ProductActions";

const getProducts = async () => {
    const  { data } = await api.get("/products");
    return data;
} 

export default function Products() {
    const {data, isLoading} = useQuery("products", getProducts)

  return (
    <section>
        <h1></h1>
        <div className="flex gap-4">
          <ProductActions />
        </div>
        <ProductDataTable data={data ? data.product : []} isLoading={isLoading} />
    </section>
  )
}