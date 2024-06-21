import api from "@/service";

export const getMethodPayments = async () => {
    const { data } = await api.get('/payments');
    return data
}