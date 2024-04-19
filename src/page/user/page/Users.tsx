import api from "@/service";
import UserActions from "../components/UserActions";
import { useQuery } from 'react-query'
import UserDataTable from "../components/UserDataTable";

const getUsers = async () => {
    const { data } = await api.get('/users')
    return data
}

export default function Users() {
    const { data, isLoading } = useQuery("users", getUsers)

  return (
    <section className="flex flex-col gap-8 px-20 py-12">
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
