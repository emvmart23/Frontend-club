import api from "@/service";

export const getCustomer = async () => {
  const { data } = await api.get("/customers");
  return data;
};
