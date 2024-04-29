import api from "@/service";
import { AppDispatch } from "@/store/store";
import { setRole } from ".";

export const getRoles = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get("/roles");
      dispatch(setRole(data));
    } catch (err) {
      console.log(err);
    }
  };
};
