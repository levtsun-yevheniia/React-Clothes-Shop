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
  const [itemOffset, setItemOffset] = React.useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  React.useEffect(() => {
    // setLoading(true);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryId, sortType, searchValue, currentPage]);

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
    const newOffset = (selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const handleResetClick = () => {
    setItemOffset(0);
    setCurrentPage(0);
  };

  const changeCategory = (i) => {
    setCategoryId(i);
    handleResetClick();
  };

  const changeSort = (i) => {
    setSortType(i);
    handleResetClick();
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

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        forcePage={currentPage}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Catalog;
