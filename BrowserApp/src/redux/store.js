import { configureStore } from "@reduxjs/toolkit";
import isEditable from "./isEditable";
import pageSlice from "./pagesSlice";
import selectSlice from "./selectSlice";
import showExpo from "./showExpo";
import userData from "./UserData";

const store = configureStore({
  reducer: {
    isEditable,
    pages: pageSlice,
    select: selectSlice,
    showExpo,
    userData,
  },
});

export default store;
