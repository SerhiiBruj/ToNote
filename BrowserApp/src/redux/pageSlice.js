import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'pageType',
  initialState: {
    value: 'Home',
  },
  reducers: {
    currentPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { currentPage } = pageSlice.actions;
export default pageSlice.reducer;
