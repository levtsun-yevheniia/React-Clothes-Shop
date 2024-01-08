import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TSort = {
  name: string;
  sortProperty: 'rating' | '-title' | 'price' | '-price';
};

export interface IFilterSliceState {
  categoryId: number;
  currentPage: number;
  sort?: TSort;
}

const initialState: IFilterSliceState = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId =
        action.payload.categoryId !== undefined ? Number(action.payload.categoryId) : 0;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions; //methods export

export default filterSlice.reducer;
