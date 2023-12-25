import { TCartItem } from '../redux/slices/cartSlice';

export const getTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
