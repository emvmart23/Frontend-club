import api from "@/service";
import { AppDispatch } from "@/store/store";
import { setCategory } from ".";

export const getCategories = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get("/categories");
      dispatch(setCategory(data));
    } catch (err) {
      console.log(err);
    }
  };
};