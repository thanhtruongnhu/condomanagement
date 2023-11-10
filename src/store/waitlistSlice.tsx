import { createSlice } from "@reduxjs/toolkit";

export const waitlistSlice = createSlice({
  name: "waitlistData",
  initialState: {
    value: null, 
  },
  reducers: {
    updateWaitlistData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateWaitlistData } = waitlistSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// state: global store; .waitlistData(1): slice of info/ category;  .value(2): get a specific piece of user info
export const selectWaitlistData = (state:any) => state.waitlistData.value;

export default waitlistSlice.reducer;