import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartComp/CartItem';
import CartEmpty from '../components/CartComp/CartEmpty';
import { clearItems, selectCart } from '../redux/slices/cartSlice';

type CartItemProps = {
  id: string;
  title: string;
  size: number;
  type: number;
  price: number;
  count: number;
  imageUrl: string;
};

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, totalCount, items } = useSelector(selectCart);

  const afterTax = (totalPrice * 1.15).toFixed(2);

  const onClickClear = () => {
    dispatch(clearItems());
  };

  return (
    <div className="cart">
      <div className="container__indent"></div>
      <div className="main_title">
        <h1>Your cart</h1>
      </div>
      {totalPrice === 0 && <CartEmpty />}
      {totalPrice > 0 && (
        <div className="content">
          <div className="content__items">
            <ul className="title">
              <li>Product</li>
              <li>Quantity</li>
              <li>Item price</li>
            </ul>
            <div className="line"></div>
            {items.map((item: CartItemProps) => (
              <CartItem key={item.id + item.size + item.type} {...item} />
            ))}
            <div className="line line--lighter"></div>
          </div>

          <div className="content__other">
            <div onClick={onClickClear} className="emptycart">
              <button className="emptycart__text"> Empty the cart</button>
              <svg
                className="emptycart__svg"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
              >
                <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" />
              </svg>
            </div>
            <div className="subtotal">
              <div className="subtotal__title">
                <p>ORDER SUMMARY | {totalCount} ITEM(S)</p>
              </div>
              <div className="subtotal__block">
                <div className="text">
                  <ul>
                    <li>SUBTOTAL:</li>
                    <br />
                    <li>Tax:</li>
                    <br />
                    <li>ORDER TOTAL:</li>
                    <br />
                  </ul>
                </div>
                <div className="prices">
                  <ul>
                    <li>{totalPrice} $</li>
                    <br />
                    <li>15%</li>
                    <br />
                    <li>{afterTax} $</li>
                    <br />
                  </ul>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="checkout">CHECKOUT</button>
              <button className="continue">
                <Link className="continuelink" to="/catalog">
                  CONTINUE SHOPPING
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
