import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilterValue(state, action) {
      return (state = action.payload.filterValue);
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { updateFilterValue } = filterSlice.actions;

export const getFilterValue = state => state.filter;
