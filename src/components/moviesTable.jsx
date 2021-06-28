import React, { Component } from "react";
import Like from "./common/like.jsx";
import Table from "./common/table.jsx";

class MoviesTable extends Component {
  render() {
    let { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    const headers = [
      { path: "title", label: "Title" },
      { path: "numberInStock", label: "Stock" },
      { path: "genre.name", label: "Genre" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <Like Liked={movie.liked} onToggleLike={() => onLike(movie)} />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ),
      },
    ];

    return (
      <Table
        headers={headers}
        items={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
