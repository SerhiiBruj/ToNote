import { createSlice } from "@reduxjs/toolkit";

export const isTable = createSlice({
  name: "isTable",
  initialState: {
    value: false,
  },
  reducers: {
    updateisTable: (state) => {
      state.value =!state.value;
    },
  },
});
export const {updateisTable} = isTable.actions
export default isTable.reducer;
