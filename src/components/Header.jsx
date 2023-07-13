import { Link } from 'react-router-dom';
import React from 'react';
import Search from './Search';

import logo from '../assets/img/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [loading, setLoading] = React.useState(false);
  const isFixed = useFixedHeader();

  React.useEffect(() => {
    setLoading(true);
  }, []);

  function useFixedHeader() {
    const [isFixed, setIsFixed] = React.useState(false);

    React.useEffect(() => {
      function handleScroll() {
        if (window.pageYOffset > 750) {
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
          <div className={loading === true ? 'header__logo active' : 'header__logo'}>
            <img strokeWidth="38" src={logo} alt="Pizza logo" />
          </div>
        </Link>

        <div className="header__menu">
          <ul className={loading === true ? 'active' : ''}>
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>For client</li>
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
            <span>520 ₽</span>
            <div className="button__delimiter"></div>
            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
            <span>3</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
