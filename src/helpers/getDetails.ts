import api from "@/service";

export const getDetails = async () => {
  const data = await api.get("details");
  return data;
};