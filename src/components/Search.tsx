import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../redux/slices/searchSlice';

interface SearchProps {
  setSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setSmallScreen }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: any) => state.search.searchValue);

  const handleClickOutside = () => {
    dispatch(setSearchValue(''));
    setSmallScreen(false);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value));
  };

  const useOutsideClick = (callback: () => void) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener('click', handleClick, true);

      return () => {
        document.removeEventListener('click', handleClick, true);
      };
    }, [ref, callback]);

    return ref;
  }; //clearing the search field when we have click outside the field

  const searchcomp = useOutsideClick(handleClickOutside);

  return (
    <div ref={searchcomp} className="box">
      <input
        value={searchValue}
        onChange={onChangeInput}
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
