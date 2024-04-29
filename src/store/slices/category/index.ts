
import { createSlice } from "@reduxjs/toolkit";

interface Props {
  category: Category[];
}

const initialState: Props = {
  category: [
    {
      category_id: 0,
      name: ""
    },
  ],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
  },
});

export const { setCategory } = categorySlice.actions;