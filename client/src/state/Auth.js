import { createSlice } from "@reduxjs/toolkit";
import { getValidatedUserData } from "../utils/UserValidation";

const userSlice = createSlice({
  name: "userContext",
  initialState: {
    data: getValidatedUserData(),
    error: null,
  },
  reducers: {
    getUserDataOnSuccess(state, action) {
      state.data = getValidatedUserData(action?.payload);
      state.error = null;
    },
    getUserDataOnFailiure(state, action) {
      state.error = action.payload;
    },
    logOut(state, action) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { getUserDataOnFailiure, getUserDataOnSuccess, logOut } =
  userSlice.actions;
export default userSlice.reducer;
