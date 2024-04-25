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
// sueldo
//  porcentaje de ganacia
// 
  return (
    <section className="flex flex-col gap-8 w-full">
        <h3 className="text-3xl">Productos</h3>
        <div>
          <ProductActions />
        </div>
        <ProductDataTable data={data ? data.product : []} isLoading={isLoading} />
    </section>
  )
}