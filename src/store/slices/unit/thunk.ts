import api from "@/service";
import { AppDispatch } from "@/store/store";
import { setUnit } from ".";

export const getUnits = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await api.get("/unit_measures");
      dispatch(setUnit(data));
    } catch (err) {
      console.log(err);
    }
  };
};