import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  onChangePage: any;
  pageCount: number;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage, pageCount, currentPage }) => {
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
