import { createSlice } from "@reduxjs/toolkit";

export const startAnimation = createSlice({
  name: "startAnimation",
  initialState: {
    value: false,
  },
  reducers: {
    doAnimate: (state) => {
      state.value = true;
    },
    donotanimate: (state) => {
      state.value = false;
    },
  },
});
export const {doAnimate,donotanimate} = startAnimation.actions
export default startAnimation.reducer;
