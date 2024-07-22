import api from "@/service";

export const getBoxes = async () => {
  try {
    const { data } = await api.get("/boxes");
    return data;
  } catch (error) {
    console.log(error);
  }
};
