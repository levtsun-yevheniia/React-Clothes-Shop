import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, remoweItem, minusItem } from '../../redux/slices/cartSlice';

const CartItem = ({ id, title, size, type, price, count, imageUrl }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };

  const onClickMinus = () => {
    if (count === 1) {
      dispatch(remoweItem(id));
    } else {
      dispatch(minusItem({ id }));
    }
  };

  const onClickRemove = () => {
    dispatch(remoweItem(id));
  };

  return (
    <div className="item">
      <div className="item__image">
        <img src={imageUrl} alt="" />
      </div>
      <div className="item__info">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="charact">
          <div className="charact__size">
            <p>Size: </p>
            <p className="number">{size}</p>
          </div>
          <div className="charact__color">
            <div className={type}></div>
          </div>
        </div>
      </div>
      <div className="item__charact">
        <div className="quantity">
          <div onClick={onClickMinus} className="quantity-btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 12.998H5V10.998H19V12.998Z" fill="#FF0000" />
            </svg>
          </div>
          <p>{count}</p>
          <div onClick={onClickPlus} className="quantity-btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z"
                fill="#FF0000"
              />
            </svg>
          </div>
        </div>
        <div className="price">
          <p>{price * count} $</p>
        </div>
        <div className="remove">
          <div onClick={onClickRemove} className="remove-btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
