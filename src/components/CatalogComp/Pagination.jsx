import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={Math.ceil(9 / 4)}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
