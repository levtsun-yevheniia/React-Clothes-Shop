import { TCartItem } from '../redux/slices/cartSlice';
import { getTotalCount } from './getTotalCount';
import { getTotalPrice } from './getTotalPrice';

export const getCartFromLocalStorage = () => {
  const items = localStorage.getItem('cart');
  const parsedItems = items ? (JSON.parse(items) as TCartItem[]) : [];
  const totalCount = getTotalCount(parsedItems);
  const totalPrice = getTotalPrice(parsedItems);

  return {
    items: parsedItems,
    totalCount,
    totalPrice,
  };
};
