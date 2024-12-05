import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  showPassword: false,
  showConfirmPwd: false,
  checkbox: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleShowPwd(state, action) {
      state.showPassword = action.payload;
    },
    toggleShowConfirmPwd(state, action) {
      state.showConfirmPwd = action.payload;
    },
    toggleCheckbox(state, action) {
      state.checkbox = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});
export const { toggleShowPwd, toggleShowConfirmPwd, toggleCheckbox } =
  slice.actions;
export default slice.reducer;
