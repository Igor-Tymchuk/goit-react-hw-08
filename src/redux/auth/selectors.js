export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectShowPwd = (state) => state.auth.showPassword;
export const selectShowConfirmPwd = (state) => state.auth.showConfirmPwd;
export const selectCheckbox = (state) => state.auth.checkbox;
