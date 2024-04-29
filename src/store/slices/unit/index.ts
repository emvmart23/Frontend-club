import { createSlice } from "@reduxjs/toolkit";

interface Props {
  unit: UnitMeasure[];
}

const initialState: Props = {
  unit: [{ 
    unit_id: 0,
    abbreviation: "",
    description: ""
  }],
};

export const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload.unit;
    },
  },
});

export const { setUnit } =unitSlice.actions;