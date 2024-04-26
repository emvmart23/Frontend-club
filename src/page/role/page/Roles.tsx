import api from "@/service";
import { useQuery } from "react-query";
import RoleDataTable from "../componentes/RoleDataTable";
import RoleActions from "../componentes/RoleActions";


const getRoles = async () => {
    const  { data } = await api.get("/roles");
    return data;
} 

export default function Roles() {
  const {data, isLoading} = useQuery("roles", getRoles)

  return (
    <section className="flex flex-col gap-8 w-full">
        <h3 className="text-3xl">Roles</h3>
        <div>
          <RoleActions />
        </div>
        <RoleDataTable data={data ? data.role : []} isLoading={isLoading} />
    </section>
  )
}