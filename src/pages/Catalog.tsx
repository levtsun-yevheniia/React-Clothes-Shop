import Categories from '../components/CatalogComp/Categories';
import Sort from '../components/CatalogComp/Sort';
import ItemBlock from '../components/CatalogComp/ItemBlock';

import React from 'react';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Pagination from '../components/CatalogComp/Pagination';
import { useNavigate } from 'react-router-dom';

import { list } from '../components/CatalogComp/Sort';
import { fetchItems } from '../redux/slices/itemsSlice';

type TCatalogItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  secondimageUrl: string;
  sizes: number[];
  types: number[];
};

type TParams = {
  sortType?: string;
  categoryId?: number;
  currentPage?: number;
};

const Catalog: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state: any) => state.items);
  const { categoryId, sort, currentPage } = useSelector((state: any) => state.filter);

  const searchValue = useSelector((state: any) => state.search.searchValue);

  const sortType = sort.sortProperty;

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    dispatch(setCurrentPage(selected));
  };

  const itemsPerPage = 4;
  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const getItems = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchItems({
        order,
        sortBy,
        category,
        search,
      }),
    );
  };

  React.useEffect(() => {
    console.log('u1');

    if (window.location.search) {
      const params: TParams = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);
      if (params.sortType == 'rating' && params.categoryId == 0 && params.currentPage == 0) {
        getItems();
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
      getItems();
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
    .filter((obj: TCatalogItem) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: TCatalogItem) => <ItemBlock key={obj.id} {...obj} />);

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
        {status === 'error' ? (
          <div className="container__error-message">
            <h4>Sorry, but we didn't receive any items</h4>
          </div>
        ) : search_items_result.length === 0 ? (
          <div className="container__failed-search-message">
            <h4>Sorry, but we didn't find any items</h4>
          </div>
        ) : (
          <div className="container__items">{search_items_result}</div>
        )}
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
};

export default Catalog;
