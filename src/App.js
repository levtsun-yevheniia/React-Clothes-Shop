import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NonFound from './pages/NonFound';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';

import { Routes, Route } from 'react-router-dom';
import React from 'react';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  const handleClickOutside = () => {
    setSearchValue('');
  };

  const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener('click', handleClick, true);

      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref]);

    return ref;
  }; //clearing the search field when clicking outside the field

  const searchcomp = useOutsideClick(handleClickOutside);

  return (
    <div className="content">
      <SearchContext.Provider value={{ searchValue, setSearchValue, searchcomp }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/catalog" element={<Catalog searchValue={searchValue} />}></Route>
          <Route path="*" element={<NonFound />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
