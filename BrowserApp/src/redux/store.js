import { configureStore } from '@reduxjs/toolkit';
import pageType from './pageSlice';
import isEditable from './isEditable';

const store = configureStore({
  reducer: {
    pageType: pageType,
    isEditable:isEditable,
  },
});

export default store;
