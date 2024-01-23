import { Link } from 'react-router-dom';
import React, { useState } from 'react';
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

  const [isSmallScreen, setSmallScreen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [sections, setSections] = useState([
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
  ]);

  const toggleSection = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : { ...section, isOpen: false },
      ),
    );
    toggleMenu();
  };

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
        console.log(isSmallScreen);

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
      <div className={`container ${isSmallScreen === true ? 'adaptive' : ''}`}>
        <Link to="/" className="container__logo">
          <div
            onClick={() => dispatch(setFilters(nullParams))}
            className={loading === true ? 'logo active' : 'logo'}
          >
            <img src={logo} alt="Logo" />
          </div>
        </Link>

        <div className="container__menu">
          <div className={`menu-icon  ${loading === true ? 'active' : ''}`} onClick={toggleMenu}>
            <svg
              width="40"
              height="16"
              viewBox="0 0 51 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.96154 0C1.44131 0 0.942381 0.152182 0.574521 0.423068C0.206661 0.693954 0 1.06135 0 1.44444C0 1.82753 0.206661 2.19493 0.574521 2.46582C0.942381 2.73671 1.44131 2.88889 1.96154 2.88889H49.0385C49.5587 2.88889 50.0576 2.73671 50.4255 2.46582C50.7933 2.19493 51 1.82753 51 1.44444C51 1.06135 50.7933 0.693954 50.4255 0.423068C50.0576 0.152182 49.5587 0 49.0385 0H1.96154ZM0 13C0 12.6169 0.206661 12.2495 0.574521 11.9786C0.942381 11.7077 1.44131 11.5556 1.96154 11.5556H49.0385C49.5587 11.5556 50.0576 11.7077 50.4255 11.9786C50.7933 12.2495 51 12.6169 51 13C51 13.3831 50.7933 13.7505 50.4255 14.0214C50.0576 14.2923 49.5587 14.4444 49.0385 14.4444H1.96154C1.44131 14.4444 0.942381 14.2923 0.574521 14.0214C0.206661 13.7505 0 13.3831 0 13ZM0 24.5556C0 24.1725 0.206661 23.8051 0.574521 23.5342C0.942381 23.2633 1.44131 23.1111 1.96154 23.1111H49.0385C49.5587 23.1111 50.0576 23.2633 50.4255 23.5342C50.7933 23.8051 51 24.1725 51 24.5556C51 24.9386 50.7933 25.306 50.4255 25.5769C50.0576 25.8478 49.5587 26 49.0385 26H1.96154C1.44131 26 0.942381 25.8478 0.574521 25.5769C0.206661 25.306 0 24.9386 0 24.5556Z"
                fill="#FF0000"
              />
            </svg>
          </div>
          <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
            <ul className={`menu-list  ${loading === true ? 'active' : ''}`}>
              <li
                className={` menu-list__item ${sections[0].isOpen ? 'active' : ''}`}
                onClick={() => toggleSection(1)}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={` menu-list__item ${sections[1].isOpen ? 'active' : ''}`}
                onClick={() => toggleSection(2)}
              >
                <Link to="/catalog">Catalog</Link>
              </li>
              <li
                className={` menu-list__item ${sections[2].isOpen ? 'active' : ''}`}
                onClick={() => toggleSection(3)}
              >
                <Link to="/forclient">For client</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container__icons">
          <div
            className={loading === true ? 'search active' : 'search'}
            onClick={() => setSmallScreen(true)}
          >
            {' '}
            <Search setSmallScreen={setSmallScreen} />
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
            <span className="total-price">{totalPrice} $</span>
            <div className="delimiter"></div>
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            <span className="total-count">{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
