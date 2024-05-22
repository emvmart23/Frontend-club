import api from "@/service"

export const getUsers = async () => {
    const { data } = await api.get('/users')
    return data
}