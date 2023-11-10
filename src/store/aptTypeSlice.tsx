import { createSlice } from "@reduxjs/toolkit";

export const aptTypeSlice = createSlice({
  name: "aptTypeData",
  initialState: {
    value: null, 
  },
  reducers: {
    updateAptTypeData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateAptTypeData } = aptTypeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// state: global store; .aptTypeData(1): slice of info/ category;  .value(2): get a specific piece of user info
export const selectAptTypeData = (state:any) => state.aptTypeData.value;

export default aptTypeSlice.reducer;