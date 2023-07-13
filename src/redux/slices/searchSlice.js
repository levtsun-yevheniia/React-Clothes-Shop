import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setSearchValue } = searchSlice.actions; //methods export

export default searchSlice.reducer;
