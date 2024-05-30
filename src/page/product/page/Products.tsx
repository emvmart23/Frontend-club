import { useQuery } from "react-query";
import ProductDataTable from "../components/ProductsDataTable";
import ProductActions from "../components/ProductActions";
import { getProducts } from "@/helpers/getProducts";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { getCategories } from "@/store/slices/category/thunk";
import { getUnits } from "@/store/slices/unit/thunk";

export default function Products() {
  const { data, isLoading } = useQuery("products", getProducts);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories()) 
  },[])

  useEffect(() => {
    dispatch(getUnits())
  }, [])

  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Productos</h3>
      <div>
        <ProductActions />
      </div>
      <ProductDataTable data={data ? data.product : []} isLoading={isLoading} />
    </section>
  );
}
