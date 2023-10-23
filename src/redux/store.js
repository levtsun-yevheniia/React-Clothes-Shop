import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import itemsSlice from './slices/itemsSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    cart: cartReducer,
    items: itemsSlice,
  },
});
