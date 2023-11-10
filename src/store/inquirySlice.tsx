import { createSlice } from "@reduxjs/toolkit";

export const inquirySlice = createSlice({
  name: "inquiryData",
  initialState: {
    value: null, 
  },
  reducers: {
    updateInquiryData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateInquiryData } = inquirySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// state: global store; .inquiryData(1): slice of info/ category;  .value(2): get a specific piece of user info
export const selectInquiryData = (state:any) => state.inquiryData.value;

export default inquirySlice.reducer;