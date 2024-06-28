import api from "@/service";
import { useQuery } from "react-query";
import BoxActions from "../components/OpeningBoxActions";
import OpeningBoxDataTable from "../components/OpeningBoxDataTable";

const getBox = async () => {
  const { data } = await api.get("/boxes");
  return data;
};

export default function OpeningBoxes() {
  const { data, isLoading } = useQuery("box", getBox);
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl font-medium mb-4">Apertura de cajas</h3>
      <div>
        <BoxActions />
      </div>
      <div>
        <OpeningBoxDataTable
          data={data ? data.boxes : []}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
