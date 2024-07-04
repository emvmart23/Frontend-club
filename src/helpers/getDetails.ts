import api from "@/service";

export const getDetails = async () => {
  try {
    const { data } = await api.get("details");
    return data;
  } catch (error) {
    console.log(error);
  }
};
