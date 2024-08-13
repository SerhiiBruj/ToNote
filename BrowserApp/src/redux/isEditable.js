import { createSlice } from '@reduxjs/toolkit';

export const isEditable = createSlice({
  name: 'isEditable',
  initialState: {
    value: false,
  },
  reducers: {
    edit: (state) => {
      state.value = !state.value;
    },
    editPayload: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const {edit,editPayload} = isEditable.actions
export default isEditable.reducer;
