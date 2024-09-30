import { createSlice } from "@reduxjs/toolkit";

// create a auth slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("abmyntra-token", action.payload.token)
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("abmyntra-token");
    },
  },
});

export const { updateUser, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
