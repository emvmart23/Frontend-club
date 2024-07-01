import api from "@/service";

export const getRoles = async () => {
    const { data } = await api.get("/roles");
    return data;
  };
  