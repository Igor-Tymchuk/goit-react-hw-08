import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "common",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    changeTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { changeTheme } = slice.actions;
export default slice.reducer;
