import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onChangePage, pageCount, currentPage }) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={onChangePage}
      forcePage={currentPage}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
    />
  );
};

export default Pagination;
