import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'top rated',
    sortProperty: 'rating',
  },
  currentPage: 0,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    //actions
    setCategoryId(state, action) {
      state.categoryId = action.payload; //Here we pass to the variable categoryId the value that we got from action.payload
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions; //methods export

export default filterSlice.reducer;
