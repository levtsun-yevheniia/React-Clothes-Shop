import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: string;
};

const list: SortItem[] = [
  { name: 'top rated', sortProperty: 'rating' },
  { name: 'price High to Low', sortProperty: 'price' },
  { name: 'price Low to High', sortProperty: '-price' },
  { name: 'alphabet', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);

  const [open, setOpen] = React.useState(false);
  const [triangle, setTriangle] = React.useState(false);

  const onClickLabel = () => {
    setOpen(!open);
    setTriangle(!triangle);
  };

  const onClickListItem = (obj: SortItem) => {
    setOpen(!open);
    dispatch(setSort(obj));
    setTriangle(false);
  };

  const handleClickOutside = () => {
    setOpen(false);
    setTriangle(false);
  };

  const useOutsideClick = (callback: any) => {
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
    }, [ref]);

    return ref;
  };

  const sortRef = useOutsideClick(handleClickOutside);

  return (
    <div ref={sortRef} className="sort">
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
export { list };
