import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
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
    // remoweItem(state, action) {
    //   state.items = state.items.filter((obj) => {
    //     return (
    //       obj.id !== action.payload && obj.size !== action.payload && obj.type !== action.payload
    //     );
    //   });
    //   state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price * obj.count + sum;
    //   }, 0);
    // },
    remoweItem(state, action) {
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

      // state.totalPrice -= indexesToRemove.reduce((sum, index) => {
      //   if (index >= 0 && index < state.indexesToRemove.length) {
      //     return sum + state.indexesToRemove[index].price;
      //   }
      //   return sum;
      // }, 0);
      // state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },

    clearItems(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, remoweItem, minusItem, clearItems } = cartSlice.actions; //methods export

export default cartSlice.reducer;
