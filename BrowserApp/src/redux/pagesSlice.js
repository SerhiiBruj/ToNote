import { createSlice } from "@reduxjs/toolkit";

export const pages = createSlice({
  name: "startAnimation",
  initialState: {
    value: [],
  },
  reducers: {
    updatePages: (state,action) => {
      state.value = action.payload;
    },
  },
});
export const {updatePages} = pages.actions
export default pages.reducer;
