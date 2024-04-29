import { createSlice } from "@reduxjs/toolkit";

interface Props {
  role: Role[];
}

const initialState: Props = {
  role: [{ role_id: 0, role_name: "" }],
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { setRole } = roleSlice.actions;