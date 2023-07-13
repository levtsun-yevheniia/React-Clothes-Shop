import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../App';

import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../redux/slices/searchSlice';

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.searchValue);

  const handleClickOutside = () => {
    dispatch(setSearchValue(''));
    console.log('outside');
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
  }; //clearing the search field when we have click outside the field

  const searchcomp = useOutsideClick(handleClickOutside);

  return (
    <div ref={searchcomp} className="box">
      <input
        value={searchValue}
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
        type="text"
        name=""
        className="search-txt"
        placeholder="Search..."
      ></input>
      <button className="search-btn">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};
export default Search;
