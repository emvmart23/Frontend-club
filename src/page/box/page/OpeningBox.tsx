import api from "@/service";
import { useQuery } from "react-query";
import BoxActions from "../components/OpeningBoxActions";
import OpeningBoxDataTable from "../components/OpeningBoxDataTable";
import useTitle from "@/hooks/useTitle";

const getBox = async () => {
  const { data } = await api.get("/boxes");
  return data;
};

export default function OpeningBoxes() {
  const { data, isLoading } = useQuery("box", getBox);
  useTitle("Apertura de cajas")

  return (
    <section className="flex flex-col gap-6 w-full">
      <h1 className="text-3xl font-medium mb-4">Apertura de cajas</h1>
      <BoxActions />
      <OpeningBoxDataTable
        data={data ? data.boxes : []}
        isLoading={isLoading}
      />
    </section>
  );
}
