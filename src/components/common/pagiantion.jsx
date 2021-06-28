import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
class Pagination extends Component {
  state = {};
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const totalPages = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, totalPages + 1);

    if (totalPages <= 1) return null;

    return (
      <nav>
        <ul className="pagination">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </a>
          </li>

          {pages.map((pageNumber) => (
            <li
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={
                currentPage === pageNumber ? "page-item active" : "page-item"
              }
            >
              <a className="page-link">{pageNumber}</a>
            </li>
          ))}

          <li
            className={
              totalPages === currentPage ? "page-item disabled" : "page-item"
            }
          >
            <a
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
