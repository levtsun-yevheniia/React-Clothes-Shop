import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ISearchSlice {
  searchValue: string;
}

const initialState: ISearchSlice = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    //actions
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const selectSearch = (state: RootState) => state.search.searchValue;

export const { setSearchValue } = searchSlice.actions; //methods export

export default searchSlice.reducer;
