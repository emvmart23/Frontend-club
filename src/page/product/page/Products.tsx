import api from "@/service";
import { useQuery } from "react-query";
import ProductDataTable from "../components/ProductsDataTable";
import ProductActions from "../components/ProductActions";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { getUnits } from "@/store/slices/unit/thunk";
import { getCategories } from "@/store/slices/category/thunk";

const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export default function Products() {
  const { data, isLoading } = useQuery("products", getProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUnits());
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
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
