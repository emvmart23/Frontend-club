import api from "@/service";

export const getUsersWithOutRedux = async () => {
  try {
      const { data } = await api.get("/users");
      return data.data
    } catch (err) {
      console.log(err);
    }
}