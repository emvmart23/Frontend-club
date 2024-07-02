import api from "@/service";

export const getAttendance = async () => {
  const { data } = await api.get("/attendances");
  console.log("get",data)
  return data;
};
