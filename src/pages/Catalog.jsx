import Categories from '../components/CatalogComp/Categories';
import Sort from '../components/CatalogComp/Sort';
import ItemBlock from '../components/CatalogComp/ItemBlock';

import React from 'react';
import ReactPaginate from 'react-paginate';

function Catalog({ searchValue }) {
  let [items, setItems] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'popularity',
    sortProperty: 'rating',
  });
  const [currentPage, setCurrentPage] = React.useState(0);

  const itemsPerPage = 4;
  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  console.log('рендер');

  const fetchItems = React.useCallback(() => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
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
  }, [categoryId, sortType.sortProperty, searchValue]);

  React.useEffect(() => {
    // setLoading(true);
    fetchItems();
    setCurrentPage(0);
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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const changeCategory = (i) => {
    setCategoryId(i);
  };

  const changeSort = (i) => {
    setSortType(i);
  };

  return (
    <div className="container">
      <div className="container__indent"></div>
      <div className="main_title">
        <h1>Catalog</h1>
      </div>
      <div className="container__top">
        <Sort value={sortType} onChangeSort={(i) => changeSort(i)} />
      </div>
      <div className="container__body">
        <Categories value={categoryId} onChangeCategory={(i) => changeCategory(i)} />
        <div className="container__items">{search_items_result}</div>
      </div>

      {pageCount > 0 && (
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          forcePage={currentPage}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
        />
      )}
    </div>
  );
}

export default Catalog;
