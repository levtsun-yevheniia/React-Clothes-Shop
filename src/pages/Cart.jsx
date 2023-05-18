function Cart() {
  return (
    <div className="cart">
      <div class="container__indent"></div>
      <div className="main_title">
        <h1>Your cart</h1>
      </div>
      <div className="content">
        <div className="content__items">
          <ul className="title">
            <li>Product</li>
            <li>Quantity</li>
            <li>Item price</li>
          </ul>
          <div className="line"></div>
          <div className="item">
            <div className="item__image">
              <img
                src="https://img.ltwebstatic.com/images3_pi/2023/03/13/167868558664c5335f7ea0a853c2c37adb5bae52fa_thumbnail_900x.webp"
                alt=""
              />
            </div>
            <div className="item__info">
              <div className="title">
                <p>WIDE PRINT PANTS</p>
              </div>
              <div className="charact">
                <div className="charact__size">
                  <p>Size: </p>
                  <p className="number">34</p>
                </div>
                <div className="charact__color">
                  <div className="black"></div>
                </div>
              </div>
            </div>
            <div className="item__charact">
              <div className="quantity">
                <div className="quantity-btn">
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

                <p>1</p>
                <div className="quantity-btn">
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
              </div>
              <div className="price">
                <p>450$</p>
              </div>
              <div className="remove">
                <div className="remove-btn">
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
          <div className="line line--lighter"></div>
          <div className="item">
            <div className="item__image">
              <img
                src="https://img.ltwebstatic.com/images3_pi/2023/03/03/1677809641480e1659ce890eb1e0be81ae1a80db9a_thumbnail_405x552.webp"
                alt=""
              />
            </div>
            <div className="item__info">
              <div className="title">
                <p>WIDE PRINT PANTS</p>
              </div>
              <div className="charact">
                <div className="charact__size">
                  <p>Size: </p>
                  <p className="number">34</p>
                </div>
                <div className="charact__color">
                  <div className="black"></div>
                </div>
              </div>
            </div>
            <div className="item__charact">
              <div className="quantity">
                <div className="quantity-btn">
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

                <p>1</p>
                <div className="quantity-btn">
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
              </div>
              <div className="price">
                <p>450$</p>
              </div>
              <div className="remove">
                <div className="remove-btn">
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
        </div>
        <div className="content__other">
          <div className="subtotal">
            <div className="subtotal__title">
              <p>ORDER SUMMARY | 2 ITEM(S)</p>
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
                  <li>450$</li>
                  <br />
                  <li>15%</li>
                  <br />
                  <li>550$</li>
                  <br />
                </ul>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button className="checkout">CHECKOUT</button>
            <button className="continue">CONTINUE SHOPPING</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
