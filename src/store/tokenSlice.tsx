import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "tokenData",
  initialState: null,
  reducers: {
    updateToken: (state, action) => {
      return action.payload; // Set the token in the state
    },
    clearToken: (state) => {
      return null; // Clear the token from the state
    },
    retrieveToken: (state) => {
      // Return the current token state
      return state;
    },
  },
});

export const { updateToken, clearToken, retrieveToken } = tokenSlice.actions;
export default tokenSlice.reducer;
