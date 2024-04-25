import CategoryActions from "../components/CategoryActions";
import api from "@/service";
import { useQuery } from "react-query";
import CategoryDataTable from "../components/CategoryDataTable";

const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export default function Categories() {
  const { data, isLoading } = useQuery("Categories", getCategories);

  return (
    <section className="flex flex-col gap-8 w-full">
    <h3 className="text-3xl">Categorias</h3>
      <div className="flex gap-4">
        <CategoryActions />
      </div>
      <CategoryDataTable
        data={data ? data.category : []}
        isLoading={isLoading}
      />
    </section>
  );
}
