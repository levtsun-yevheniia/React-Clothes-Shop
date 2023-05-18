import React, { useState } from 'react';

function ItemBlock({ title, price, imageUrl, sizes, types, images }) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ['white', 'black', 'blue'];

  return (
    <div className="item-block">
      <div className="item-block__image">
        <img src={imageUrl} alt="item" />
      </div>
      <h4 className="item-block__title">{title}</h4>
      <div className="item-block__selector">
        <ul className="colors">
          {types.map((typeId, i) => (
            <li
              key={i}
              onClick={() => setActiveType(i)}
              className={activeType === i ? 'active' : ''}
            >
              {' '}
              <div className="color_block">
                <div className={typeNames[typeId]}></div>
              </div>
            </li>
          ))}
        </ul>

        <ul className="list list--second">
          {sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}
            >
              {' '}
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="item-block__bottom">
        <div className="item-block__price"> {price} $</div>
        <div className="button button--add">
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
          <span>Add</span>
        </div>
      </div>
    </div>
  );
}

export default ItemBlock;
