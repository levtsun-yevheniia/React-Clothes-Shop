import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { getTotalCount } from '../../utils/getTotalCount';
import { getTotalPrice } from '../../utils/getTotalPrice';

export type TCartItem = {
  id: string;
  title: string;
  size: number;
  type: string;
  price: number;
  count: number;
  imageUrl: string;
};

interface ICartSliceState {
  totalPrice: number;
  totalCount: number;
  items: TCartItem[];
}

const { items, totalCount, totalPrice } = getCartFromLocalStorage();

const initialState: ICartSliceState = {
  totalPrice: totalPrice,
  totalCount: totalCount,
  items: items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      // state.totalCount = getTotalCount(state.items);
      // state.totalPrice = getTotalPrice(state.items);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });
      if (findItem) {
        findItem.count--;
        state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
        state.totalPrice -= findItem.price;
      }
    },
    remoweItem(state, action: PayloadAction<TCartItem>) {
      let toRemove = [];
      toRemove = state.items.filter((obj) => {
        return (
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
        );
      });

      const indexesToRemove = toRemove.map((obj) => {
        return state.items.findIndex((item) => {
          return item.id === obj.id && item.size === obj.size && item.type === obj.type;
        });
      });

      indexesToRemove.forEach((indexToRemove) => {
        if (indexToRemove >= 0 && indexToRemove < state.items.length) {
          state.items.splice(indexToRemove, 1);
        }
      });

      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, remoweItem, minusItem, clearItems } = cartSlice.actions; //methods export

export default cartSlice.reducer;
