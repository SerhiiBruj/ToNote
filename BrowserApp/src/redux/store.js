import { configureStore } from "@reduxjs/toolkit";
import isEditable from "./isEditable";
import startAnimation from "./startAnimation";
import pageSlice from "./pagesSlice";
import selectSlice from "./selectSlice";
import showExpo from "./showExpo";
import userData from "./UserData";

const store = configureStore({
  reducer: {
    startAnimation,
    isEditable,
    pages: pageSlice,
    select: selectSlice,
    showExpo,
    userData,
  },
});

export default store;
