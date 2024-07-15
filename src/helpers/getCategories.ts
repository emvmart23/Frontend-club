import api from "@/service";

export const getCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch (err) {
    console.log(err);
  }
};
