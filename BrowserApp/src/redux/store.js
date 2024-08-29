import { configureStore } from '@reduxjs/toolkit';
import isEditable from './isEditable';
import startAnimation from './startAnimation';
import pageSlice from './pagesSlice';
import selectSlice from './selectSlice';
import showExpo from './showExpo';
import isTable  from './istable';

const store = configureStore({
  reducer: {
    startAnimation:startAnimation,
    isEditable:isEditable,
    pages:pageSlice,
    select:selectSlice,
    showExpo:showExpo,
    isTable:isTable
  },
});

export default store;
