import { createSlice } from "@reduxjs/toolkit";

export const applicationSlice = createSlice({
  name: "applicationData",
  initialState: {
    value: null, 
  },
  reducers: {
    updateApplicationData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateApplicationData } = applicationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// state: global store; .applicationData(1): slice of info/ category;  .value(2): get a specific piece of user info
export const selectApplicationData = (state:any) => state.applicationData.value;

export default applicationSlice.reducer;