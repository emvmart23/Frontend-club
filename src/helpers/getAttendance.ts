import api from "@/service";

export const getAttendance = async () => {
  try {
    const { data } = await api.get("/attendances");
    return data;
  } catch (error) {
    console.log(error);
  }
};
