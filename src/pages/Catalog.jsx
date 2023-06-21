import Categories from '../components/CatalogComp/Categories';
import Sort from '../components/CatalogComp/Sort';
import ItemBlock from '../components/CatalogComp/ItemBlock';

import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Pagination from '../components/CatalogComp/Pagination';

function Catalog({ searchValue }) {
  let [items, setItems] = React.useState([]);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: 'popularity',
  //   sortProperty: 'rating',
  // });                                         replaced by ReduxToolkit

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // const [currentPage, setCurrentPage] = React.useState(0);  replaced by ReduxToolkit

  const onPageChange = ({ selected }) => {
    dispatch(setCurrentPage(selected));
  };

  const itemsPerPage = 4;
  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log('render');

  const fetchItems = React.useCallback(() => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://63b609d958084a7af3a8043f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
    axios
      .get(
        `https://63b609d958084a7af3a8043f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
      });
  }, [categoryId, sortType, searchValue]);

  React.useEffect(() => {
    // setLoading(true);
    fetchItems();
    dispatch(setCurrentPage(0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchItems]);

  const search_items_result = currentItems
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <ItemBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="container__indent"></div>
      <div className="main_title">
        <h1>Catalog</h1>
      </div>
      <div className="container__top">
        <Sort />
      </div>
      <div className="container__body">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <div className="container__items">{search_items_result}</div>
      </div>

      {pageCount > 0 && (
        <Pagination
          onChangePage={onPageChange}
          pageCount={pageCount}
          currentPage={currentPage}
        ></Pagination>
      )}
    </div>
  );
}

export default Catalog;
