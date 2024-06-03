import api from "@/service";

export const getHeaders = async () => {
  const { data } = await api.get("headers");
  return data;
};
