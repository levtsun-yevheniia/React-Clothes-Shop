import React from 'react';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div className="empty">
      <h3>is empty</h3>
      <button className="continue">
        <Link className="continuelink" to="/catalog">
          CONTINUE SHOPPING
        </Link>
      </button>
    </div>
  );
}
export default CartEmpty;
