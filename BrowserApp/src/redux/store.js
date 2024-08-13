import { configureStore } from '@reduxjs/toolkit';
import isEditable from './isEditable';
import startAnimation from './startAnimation';

const store = configureStore({
  reducer: {
    startAnimation:startAnimation,
    isEditable:isEditable,
  },
});

export default store;
