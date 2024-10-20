import { createSlice } from "@reduxjs/toolkit";
let listOfPossibleNames = [
  "note",
  "checklist",
  "todo",
  "table",
  "dashboard",
  "diary",
];

export const pages = createSlice({
  name: "pages",
  initialState: {
    value: [],
  },
  reducers: {
    updatePages: (state) => {
      state.value = [...Object.keys(window.sessionStorage).filter((item) =>
        listOfPossibleNames.includes(item.split("/")[0])
      ), ...Object.keys(window.localStorage).filter((item) =>
        listOfPossibleNames.includes(item.split("/")[0])
      )]
    },
  },
});
export const { updatePages } = pages.actions
export default pages.reducer;
