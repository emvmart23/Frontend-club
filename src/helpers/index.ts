import api from "@/service"

export const getRoles = async () => {
    const { data } = await api.get('/roles')
    return data
}

export const getCategories = async () => {
    const { data } = await api.get('/categories')
    return data
}