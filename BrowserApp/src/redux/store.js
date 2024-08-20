import { configureStore } from '@reduxjs/toolkit';
import isEditable from './isEditable';
import startAnimation from './startAnimation';
import pageSlice from './pagesSlice';
import selectSlice from './selectSlice';

const store = configureStore({
  reducer: {
    startAnimation:startAnimation,
    isEditable:isEditable,
    pages:pageSlice,
    select:selectSlice,
  },
});

export default store;
