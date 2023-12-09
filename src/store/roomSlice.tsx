import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "roomData",
  initialState: {
    value: null, 
  },
  reducers: {
    updateRoomData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateRoomData } = roomSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// state: global store; .roomData(1): slice of info/ category;  .value(2): get a specific piece of user info
export const selectRoomData = (state:any) => state.roomData.value;

export default roomSlice.reducer;