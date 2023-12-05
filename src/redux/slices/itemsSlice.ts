import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TCatalogItem } from '../../pages/Catalog';
import { RootState } from '../store';
import { TSort } from './filterSlice';

export type FetchItems = {
  sortBy: TSort;
  order: string;
  categoryId?: number;
  search: string;
};

export const fetchItems = createAsyncThunk('items/fetchItemsStatus', async (params: FetchItems) => {
  const { sortBy, order, categoryId, search } = params;
  const { data } = await axios.get(
    `https://63b609d958084a7af3a8043f.mockapi.io/items?${categoryId}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data as TCatalogItem[];
});

type TItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  secondimageUrl: string;
  sizes: number[];
  types: number[];
};

interface IItemsSliceState {
  items: TItem[];
  status: 'loading' | 'succes' | 'error';
}

const initialState: IItemsSliceState = {
  items: [],
  status: 'loading',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TCatalogItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succes';
    });

    builder.addCase(fetchItems.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectItems = (state: RootState) => state.items;

export const { setItems } = itemsSlice.actions; //methods export

export default itemsSlice.reducer;
