import { configureStore } from "@reduxjs/toolkit";
import aptTypeSlice from "./aptTypeSlice";
import inquirySlice from "./inquirySlice";
import applicationSlice from "./applicationSlice";
import waitlistSlice from "./waitlistSlice";

export default configureStore({
  reducer: {
    aptTypeData: aptTypeSlice,
    inquiryData: inquirySlice,
    applicationData: applicationSlice,
    waitlistData: waitlistSlice,
  },
});
