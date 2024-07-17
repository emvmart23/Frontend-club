import api from "@/service";
import { useQuery } from "react-query";
import RoleDataTable from "../componentes/RoleDataTable";
import RoleActions from "../componentes/RoleActions";
import useTitle from "@/hooks/useTitle";

const getRoles = async () => {
  const { data } = await api.get("/roles");
  return data;
};

export default function Roles() {
  const { data, isLoading } = useQuery("roles", getRoles);
  useTitle("Roles");

  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Roles</h3>
      <RoleActions />
      <RoleDataTable data={data ? data.role : []} isLoading={isLoading} />
    </section>
  );
}
