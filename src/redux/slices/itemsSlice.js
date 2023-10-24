import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('items/fetchItemsStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search } = params;
  const { data } = await axios.get(
    `https://63b609d958084a7af3a8043f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', //loading | success | error
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchItems.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = itemsSlice.actions; //methods export

export default itemsSlice.reducer;
