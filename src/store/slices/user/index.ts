
import { createSlice } from "@reduxjs/toolkit";

interface Props {
  user: Attendace[];
}

const initialState: Props = {
  user: [
    {
        id: 0,
        name: ""
    },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;