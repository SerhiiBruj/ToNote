import { createSlice } from "@reduxjs/toolkit";

export const showExpo = createSlice({
  name: "showExpo",
  initialState: {
    value: false,
  },
  reducers: {
    updateShowExpo: (state,action) => {
      state.value = action.payload;
    },
  },
});
export const {updateShowExpo} = showExpo.actions
export default showExpo.reducer;
