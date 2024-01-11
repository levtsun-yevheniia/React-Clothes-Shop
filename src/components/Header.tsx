import { Link } from 'react-router-dom';
import React from 'react';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../assets/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { selectCart } from '../redux/slices/cartSlice';
import { IFilterSliceState, setFilters } from '../redux/slices/filterSlice';

function Header() {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const isFixed = useFixedHeader();
  const { totalPrice, items, totalCount } = useSelector(selectCart);
  let isMounted = React.useRef(false);

  const nullParams: IFilterSliceState = {
    categoryId: 0,
    sort: {
      name: 'top rated',
      sortProperty: 'rating',
    },
    currentPage: 0,
  };

  React.useEffect(() => {
    setLoading(true);
  }, []);

  React.useEffect(() => {
    if (isMounted.current === true) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    } else {
      isMounted.current = true;
    }
  }, [items]);

  function useFixedHeader() {
    const [isFixed, setIsFixed] = React.useState(false);

    React.useEffect(() => {
      function handleScroll() {
        const catalogCheck = /\/catalog\b/;
        const cartCheck = /\/cart\b/;

        if (
          (catalogCheck.test(window.location.href) || cartCheck.test(window.location.href)) &&
          window.pageYOffset > 200
        ) {
          setIsFixed(true);
        } else if (
          !catalogCheck.test(window.location.href) &&
          !cartCheck.test(window.location.href) &&
          window.pageYOffset > 750
        ) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return isFixed;
  }

  return (
    <div className={isFixed ? 'header header--fixed' : 'header'}>
      <div className="container">
        <Link to="/">
          <div
            onClick={() => dispatch(setFilters(nullParams))}
            className={loading === true ? 'header__logo active' : 'header__logo'}
          >
            <img src={logo} alt="Logo" />
          </div>
        </Link>

        <div className="header__menu">
          <ul className={loading === true ? 'active' : ''}>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <Link to="/forclient">For client</Link>
            </li>
          </ul>
        </div>

        <div className="header__icons">
          <div className={loading === true ? 'search active' : 'search'}>
            {' '}
            <Search />
          </div>
          <div className={loading === true ? 'account active' : 'account'}>
            <button className="button button--user">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </button>
          </div>
          <Link
            to="/cart"
            className={loading === true ? 'button button--cart active' : 'button button--cart'}
          >
            <span>{totalPrice} $</span>
            <div className="button__delimiter"></div>
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
