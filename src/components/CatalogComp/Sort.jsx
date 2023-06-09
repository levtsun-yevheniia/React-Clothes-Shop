import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice';

const list = [
  { name: 'top rated', sortProperty: 'rating' },
  { name: 'price High to Low', sortProperty: 'price' },
  { name: 'price Low to High', sortProperty: '-price' },
  { name: 'alphabet', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const [open, setOpen] = React.useState(false);
  const [triangle, setTriangle] = React.useState(false);

  const onClickLabel = () => {
    setOpen(!open);
    setTriangle(!triangle);
  };

  const onClickListItem = (obj) => {
    setOpen(!open);
    dispatch(setSort(obj));
    setTriangle(false);
  };

  const handleClickOutside = () => {
    setOpen(false);
    setTriangle(false);
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
  };

  const sortcomp = useOutsideClick(handleClickOutside);

  return (
    <div ref={sortcomp} className="sort">
      <div className="sort__label">
        <b>Sort by:</b>
        <div onClick={() => onClickLabel()} className="sort__label__choise">
          <span>{sort.name}</span>
          <div className={triangle === true ? 'triangle triangle--active' : 'triangle'}></div>
        </div>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {' '}
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
