import api from "@/service";
import { useQuery } from "react-query";
import BoxDataTable from "../components/BoxDataTable";
import BoxActions from "../components/BoxActions";

const getBox = async () => {
  const { data } = await api.get("/boxes");
  return data;
};

export default function Boxes() {
  const { data, isLoading } = useQuery("box", getBox);
  
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Boxes</h3>
      <div>
        <BoxActions/>
      </div>
      <div>
        <BoxDataTable data={data ? data.boxes : []} isLoading={isLoading} />
      </div>
    </section>
  );
}
