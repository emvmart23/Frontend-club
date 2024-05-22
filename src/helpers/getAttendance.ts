import api from "@/service";

export const getAttendance = async () => {
  const { data } = await api.get("/attendances");
  return data;
};
