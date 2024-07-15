import api from "@/service";

export const getUnits = async () => {
  try {
    const { data } = await api.get("/unit_measures");
    return data;
  } catch (err) {
    console.log(err);
  }
};
