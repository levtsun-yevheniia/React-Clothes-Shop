import Categories from '../components/CatalogComp/Categories';
import Sort from '../components/CatalogComp/Sort';
import ItemBlock from '../components/CatalogComp/ItemBlock';

import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Pagination from '../components/CatalogComp/Pagination';
import { useNavigate } from 'react-router-dom';

import { list } from '../components/CatalogComp/Sort';

function Catalog() {
  let [items, setItems] = React.useState([]);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [sortType, setSortType] = React.useState({
  //   name: 'popularity',
  //   sortProperty: 'rating',
  // });                                         replaced by ReduxToolkit

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const searchValue = useSelector((state) => state.search.searchValue);

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

  const fetchItems = () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://63b609d958084a7af3a8043f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
      });
  };

  React.useEffect(() => {
    console.log('u1');
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);
      if (params.sortType == 'rating' && params.categoryId == 0 && params.currentPage == 0) {
        fetchItems();
      }
      console.log('took data from the search string and passed it to the parameters');
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    console.log('u2');
    // setLoading(true);
    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
    dispatch(setCurrentPage(0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryId, sortType, searchValue]);

  React.useEffect(() => {
    console.log('u3');
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
      console.log('put data to url');
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

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
