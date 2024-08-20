import { createSlice } from "@reduxjs/toolkit";

export const selectSlice = createSlice({
  name: 'selected',
  initialState: {
    isSelecting: false,
    selected: []
  },
  reducers: {
    startSelection: (state) => {
      state.isSelecting = true;
    },
    stopSelection: (state) => {
      state.isSelecting = false;
    },
    select: (state, action) => {
      state.selected = [...state.selected, action.payload];
    },
    deSelect: (state, action) => {
      state.selected = state.selected.filter(item => item !== action.payload);
    },
    clearSelection: (state) => {
      state.selected = [];
    }
  }
});

export const { startSelection, stopSelection, select, deSelect, clearSelection } = selectSlice.actions;
export default selectSlice.reducer;
