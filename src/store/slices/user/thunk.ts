import api from "@/service";
import { AppDispatch } from "@/store/store";
import { setUser } from ".";

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get("/users");
      dispatch(setUser(data.data));
    } catch (err) {
      console.log(err);
    }
  };
};