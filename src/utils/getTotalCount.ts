import { TCartItem } from '../redux/slices/cartSlice';

export const getTotalCount = (items: TCartItem[]) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};
