import UserActions from "../components/UserActions";
import { useQuery } from 'react-query'
import UserDataTable from "../components/UserDataTable";
import { getUsers } from "@/helpers/getUsers";

export default function Users() {
    const { data, isLoading } = useQuery("users", getUsers)
    
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-3xl">Usuarios</h3>
      <div className="flex gap-4">
        <UserActions />
      </div>
      <div>
        <UserDataTable data={data ? data.data : []} isLoading={isLoading} />
      </div>
    </section>
  )
}
