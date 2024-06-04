import api from "@/service";

export const getBoxes =  async () => {
    const { data } = await api.get("/boxes");
    return data;
}
